import { ViewTransition } from 'react';
import { ItemCard, ItemCardSkeleton } from '@/features/item/components/item-card';
import { getDiscover } from '@/features/item/item-queries';

export async function Discover() {
  const items = await getDiscover(8);
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

export function DiscoverSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <ItemCardSkeleton key={i} />
      ))}
    </div>
  );
}
