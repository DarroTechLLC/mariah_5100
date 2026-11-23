'use server';

import { updateTag } from 'next/cache';
import { z } from 'zod';
import { isSlowEnabled } from '@/components/demo/demo-slow';
import { SEED_COLLECTION_IDS } from '@/features/collection/collection-constants';
import { verifyAuth } from '@/features/user/user-queries';
import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/db';
import { moderateText } from '@/lib/moderation';
import { delay } from '@/lib/utils';

const createCollectionSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
});
const idSchema = z.string().min(1);

const colors = [
  'from-violet-500 to-purple-600',
  'from-purple-400 to-violet-500',
  'from-fuchsia-500 to-purple-600',
  'from-purple-500 to-violet-700',
  'from-violet-400 to-purple-500',
  'from-fuchsia-400 to-violet-500',
];

export async function createCollection(formData: FormData) {
  const userId = await verifyAuth();
  await delay(300, await isSlowEnabled());
  const parsed = createCollectionSchema.safeParse({ name: formData.get('name') });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, ok: false as const };
  }

  const flagged = await moderateText(parsed.data.name);
  if (flagged) return { error: flagged, ok: false as const };

  const collection = await prisma.collection.create({
    data: {
      coverColor: colors[Math.floor(Math.random() * colors.length)],
      name: parsed.data.name,
      userId,
    },
  });
  updateTag(`collections:${userId}`);
  return { ok: true as const, collection };
}

export async function addToCollection(collectionId: string, itemId: string) {
  const userId = await verifyAuth();
  await delay(200, await isSlowEnabled());
  const parsedCollectionId = idSchema.parse(collectionId);
  const parsedTrackId = idSchema.parse(itemId);
  if (SEED_COLLECTION_IDS.has(parsedCollectionId)) {
    return { error: "Can't modify a demo collection", ok: false as const };
  }
  if (!(await ownsCollection(parsedCollectionId, userId))) {
    return { error: 'Collection not found', ok: false as const };
  }
  const existing = await prisma.collectionItem.findUnique({
    where: { collectionId_itemId: { collectionId: parsedCollectionId, itemId: parsedTrackId } },
  });
  if (existing) return { error: 'Already in this collection', ok: false as const };

  const maxPos = await prisma.collectionItem.aggregate({
    _max: { position: true },
    where: { collectionId: parsedCollectionId },
  });

  try {
    await prisma.collectionItem.create({
      data: {
        collectionId: parsedCollectionId,
        position: (maxPos._max.position ?? -1) + 1,
        itemId: parsedTrackId,
      },
    });
  } catch (error) {
    // Unique violation: a racing add (rapid optimistic toggles) got there first.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { error: 'Already in this collection', ok: false as const };
    }
    throw error;
  }
  updateTag(`collection-${parsedCollectionId}`);
  updateTag(`collections:${userId}`);
  return { ok: true as const };
}

export async function removeFromCollection(collectionId: string, itemId: string) {
  const userId = await verifyAuth();
  await delay(200, await isSlowEnabled());
  const parsedCollectionId = idSchema.parse(collectionId);
  const parsedTrackId = idSchema.parse(itemId);
  if (SEED_COLLECTION_IDS.has(parsedCollectionId)) {
    return { error: "Can't modify a demo collection", ok: false as const };
  }
  if (!(await ownsCollection(parsedCollectionId, userId))) {
    return { error: 'Collection not found', ok: false as const };
  }
  await prisma.collectionItem.deleteMany({
    where: { collectionId: parsedCollectionId, itemId: parsedTrackId },
  });
  updateTag(`collection-${parsedCollectionId}`);
  updateTag(`collections:${userId}`);
  return { ok: true as const };
}

export async function deleteCollection(collectionId: string) {
  const userId = await verifyAuth();
  const id = idSchema.parse(collectionId);
  if (SEED_COLLECTION_IDS.has(id)) return { error: "Can't delete a demo collection", ok: false as const };
  await delay(300, await isSlowEnabled());
  const result = await prisma.collection.deleteMany({ where: { id, userId } });
  if (result.count === 0) return { error: 'Collection not found', ok: false as const };
  updateTag(`collections:${userId}`);
  updateTag(`collection-${id}`);
  return { ok: true as const };
}

async function ownsCollection(collectionId: string, userId: string) {
  const collection = await prisma.collection.findFirst({
    select: { id: true },
    where: { id: collectionId, userId },
  });
  return collection !== null;
}
