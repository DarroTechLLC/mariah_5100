import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { isSlowEnabled } from '@/components/demo/demo-slow';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/utils';

export async function getCategories() {
  return getCategoriesCached(await isSlowEnabled());
}

async function getCategoriesCached(slow: boolean) {
  'use cache';
  cacheTag('categories');
  cacheLife('days');

  await delay(600, slow);
  const rows = await prisma.item.groupBy({
    _count: { category: true },
    by: ['category'],
    orderBy: { _count: { category: 'desc' } },
  });
  return rows.map(r => ({
    category: r.category,
    count: r._count.category,
  }));
}
