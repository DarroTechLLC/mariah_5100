import 'server-only';

import { cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { isSlowEnabled } from '@/components/demo/demo-slow';
import { verifyAuth } from '@/features/user/user-queries';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/utils';
import { toItem } from '@/types/item';

export async function getCollections() {
  const userId = await verifyAuth();
  return getCollectionsForUser(userId, await isSlowEnabled());
}

async function getCollectionsForUser(userId: string, slow: boolean) {
  'use cache';
  cacheTag(`collections:${userId}`);

  await delay(500, slow);
  const rows = await prisma.collection.findMany({
    include: {
      _count: { select: { items: true } },
      items: {
        include: { item: true },
        orderBy: { position: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
    where: { OR: [{ userId }, { userId: null }] },
  });
  return rows.map(r => ({
    coverColor: r.coverColor,
    description: r.description,
    id: r.id,
    itemCount: r._count.items,
    items: r.items.map(ci => toItem(ci.item)),
    name: r.name,
  }));
}

export async function searchCollections(query: string) {
  const userId = await verifyAuth();
  return searchCollectionsForUser(userId, query, await isSlowEnabled());
}

async function searchCollectionsForUser(userId: string, query: string, slow: boolean) {
  'use cache';
  cacheTag(`collections:${userId}`);

  await delay(400, slow);
  const rows = await prisma.collection.findMany({
    include: {
      _count: { select: { items: true } },
      items: {
        include: { item: true },
        orderBy: { position: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
    where: {
      OR: [{ userId }, { userId: null }],
      name: { contains: query, mode: 'insensitive' },
    },
  });
  return rows.map(r => ({
    coverColor: r.coverColor,
    description: r.description,
    id: r.id,
    itemCount: r._count.items,
    items: r.items.map(ci => toItem(ci.item)),
    name: r.name,
  }));
}

export async function getCollection(id: string) {
  const userId = await verifyAuth();
  return getCollectionForUser(id, userId, await isSlowEnabled());
}

async function getCollectionForUser(id: string, userId: string, slow: boolean) {
  'use cache';
  cacheTag(`collection-${id}`);

  await delay(500, slow);
  const row = await prisma.collection.findFirst({
    include: {
      items: {
        include: { item: true },
        orderBy: { position: 'asc' },
      },
    },
    where: { OR: [{ userId }, { userId: null }], id },
  });
  if (!row) notFound();
  return {
    coverColor: row.coverColor,
    description: row.description,
    id: row.id,
    itemCount: row.items.length,
    items: row.items.map(ci => toItem(ci.item)),
    name: row.name,
  };
}

export async function getCollectionMenuItems(itemId: string) {
  const userId = await verifyAuth();
  return getCollectionMenuItemsForUser(itemId, userId);
}

async function getCollectionMenuItemsForUser(itemId: string, userId: string) {
  'use cache';
  cacheTag(`collections:${userId}`);

  const collections = await prisma.collection.findMany({
    include: { _count: { select: { items: true } } },
    orderBy: { createdAt: 'desc' },
    where: { OR: [{ userId }, { userId: null }] },
  });
  if (collections.length === 0) return [];

  const existing = await prisma.collectionItem.findMany({
    select: { collectionId: true },
    where: { collectionId: { in: collections.map(p => p.id) }, itemId },
  });
  const addedSet = new Set(existing.map(e => e.collectionId));
  return collections.map(p => ({ active: addedSet.has(p.id), label: p.name, value: p.id }));
}
