'use server';

import { revalidateTag, updateTag } from 'next/cache';
import { z } from 'zod';
import { isSlowEnabled } from '@/components/demo/demo-slow';
import { getCurrentUser, verifyAuth } from '@/features/user/user-queries';
import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/utils';

const itemIdSchema = z.string().min(1);

export async function toggleFavorite(itemId: string) {
  const userId = await verifyAuth();
  await delay(200, await isSlowEnabled());
  const id = itemIdSchema.parse(itemId);

  const existing = await prisma.userFavorite.findUnique({
    where: { userId_itemId: { itemId: id, userId } },
  });

  if (existing) {
    await prisma.userFavorite.deleteMany({
      where: { itemId: id, userId },
    });
  } else {
    try {
      await prisma.userFavorite.create({
        data: { itemId: id, userId },
      });
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')) {
        throw error;
      }
    }
  }

  updateTag(`item-${id}:${userId}`);
  updateTag(`favorites:${userId}`);
  revalidateTag(`discover:${userId}`, 'max');
  revalidateTag(`recommendations:${userId}`, 'max');
  return { ok: true as const };
}

export async function recordItemView(itemId: string) {
  const userId = await getCurrentUser();
  if (!userId) return { ok: false as const };

  const id = itemIdSchema.parse(itemId);

  await prisma.item.update({
    data: { viewCount: { increment: 1 } },
    where: { id },
  });

  await prisma.userItemView.upsert({
    create: { itemId: id, userId },
    update: { lastViewedAt: new Date() },
    where: { userId_itemId: { itemId: id, userId } },
  });

  revalidateTag(`recently-viewed:${userId}`, 'max');
  revalidateTag(`discover:${userId}`, 'max');
  revalidateTag(`recommendations:${userId}`, 'max');
  return { ok: true as const };
}
