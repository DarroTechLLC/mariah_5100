import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { isSlowEnabled } from '@/components/demo/demo-slow';
import { verifyAuth } from '@/features/user/user-queries';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/utils';
import { toItem } from '@/types/item';

const LIBRARY_PAGE_SIZE = 100;

export async function getLibrary(page: number = 1) {
  return getLibraryCached(page, await isSlowEnabled());
}

async function getLibraryCached(page: number, slow: boolean) {
  'use cache';
  cacheTag('library');
  cacheLife('hours');

  await delay(400, slow);
  const rows = await prisma.item.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * LIBRARY_PAGE_SIZE,
    take: LIBRARY_PAGE_SIZE + 1,
  });
  const hasMore = rows.length > LIBRARY_PAGE_SIZE;
  const items = hasMore ? rows.slice(0, LIBRARY_PAGE_SIZE) : rows;
  return {
    hasMore,
    items: items.map(row => toItem(row)),
  };
}

export async function getFavorites() {
  const userId = await verifyAuth();
  return getFavoritesForUser(userId, await isSlowEnabled());
}

async function getFavoritesForUser(userId: string, slow: boolean) {
  'use cache';
  cacheTag(`favorites:${userId}`);

  await delay(500, slow);
  const rows = await prisma.userFavorite.findMany({
    include: { item: true },
    orderBy: { addedAt: 'desc' },
    where: { userId },
  });
  return rows.map(row => toItem(row.item, { favorites: [row] }));
}

export async function getUserFavoriteIds() {
  const userId = await verifyAuth();
  return getUserFavoriteIdsForUser(userId);
}

async function getUserFavoriteIdsForUser(userId: string) {
  'use cache';
  cacheTag(`favorites:${userId}`);

  const rows = await prisma.userFavorite.findMany({
    select: { itemId: true },
    where: { userId },
  });
  return new Set(rows.map(r => r.itemId));
}

export async function getRecentlyViewed(limit: number = 8) {
  const userId = await verifyAuth();
  return getRecentlyViewedForUser(userId, limit, await isSlowEnabled());
}

async function getRecentlyViewedForUser(userId: string, limit: number, slow: boolean) {
  'use cache';
  cacheTag(`recently-viewed:${userId}`);
  cacheLife('minutes');

  await delay(500, slow);
  const rows = await prisma.userItemView.findMany({
    include: { item: true },
    orderBy: { lastViewedAt: 'desc' },
    take: limit,
    where: { userId },
  });
  return rows.map(row => toItem(row.item, { itemViews: [row] }));
}

export async function getItem(id: string) {
  const userId = await verifyAuth();
  return getItemForUser(id, userId, await isSlowEnabled());
}

async function getItemForUser(id: string, userId: string, slow: boolean) {
  'use cache';
  cacheTag('items', `item-${id}`, `item-${id}:${userId}`);

  await delay(400, slow);
  const row = await prisma.item.findUnique({
    include: {
      favorites: { where: { userId } },
    },
    where: { id },
  });
  if (!row) notFound();
  return toItem(row, { favorites: row.favorites });
}

export async function getMostViewed(limit: number = 8) {
  return getMostViewedCached(limit, await isSlowEnabled());
}

async function getMostViewedCached(limit: number, slow: boolean) {
  'use cache';
  cacheTag('items');

  await delay(700, slow);
  const rows = await prisma.item.findMany({
    orderBy: { viewCount: 'desc' },
    take: limit,
    where: { viewCount: { gt: 0 } },
  });
  return rows.map(row => toItem(row));
}

export async function getDiscover(limit: number = 8) {
  const userId = await verifyAuth();
  return getDiscoverForUser(userId, limit, await isSlowEnabled());
}

async function getDiscoverForUser(userId: string, limit: number, slow: boolean) {
  'use cache';
  cacheTag(`discover:${userId}`);

  await delay(1100, slow);
  const rows = await prisma.item.findMany({
    orderBy: { viewCount: 'desc' },
    take: limit,
    where: {
      favorites: { none: { userId } },
    },
  });
  return rows.map(row => toItem(row));
}

export async function getItemsByCategory(category: string) {
  return getItemsByCategoryCached(category, await isSlowEnabled());
}

async function getItemsByCategoryCached(category: string, slow: boolean) {
  'use cache';
  cacheTag('items', `category-${category}`);

  await delay(900, slow);
  const rows = await prisma.item.findMany({
    orderBy: { viewCount: 'desc' },
    where: { category },
  });
  return rows.map(row => toItem(row));
}

export async function getRecommendedItems(excludeItemId: string, limit: number = 5) {
  const userId = await verifyAuth();
  return getRecommendedItemsForUser(excludeItemId, userId, limit, await isSlowEnabled());
}

async function getRecommendedItemsForUser(excludeItemId: string, userId: string, limit: number, slow: boolean) {
  'use cache';
  cacheTag(`recommendations:${userId}`);

  await delay(900, slow);
  const rows = await prisma.item.findMany({
    orderBy: { viewCount: 'desc' },
    take: limit,
    where: {
      favorites: { none: { userId } },
      id: { not: excludeItemId },
    },
  });
  return rows.map(row => toItem(row));
}

export async function searchItems(query: string) {
  return searchItemsCached(query, await isSlowEnabled());
}

async function searchItemsCached(query: string, slow: boolean) {
  'use cache';
  cacheTag('search');
  cacheLife('hours');

  await delay(800, slow);
  const rows = await prisma.item.findMany({
    orderBy: { viewCount: 'desc' },
    take: 30,
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { subtitle: { contains: query, mode: 'insensitive' } },
        { group: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
  return rows.map(row => toItem(row));
}
