import { ViewTransition } from 'react';
import { ItemCard, ItemCardSkeleton } from '@/features/item/components/item-card';
import { getMostViewed } from '@/features/item/item-queries';

export async function MostViewed() {
  const items = await getMostViewed(8);
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map(item => (
        <ViewTransition key={item.id}>
          <ItemCard item={item} />
        </ViewTransition>
      ))}
    </div>
  );
}

export function MostViewedSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <ItemCardSkeleton key={i} />
      ))}
    </div>
  );
}
