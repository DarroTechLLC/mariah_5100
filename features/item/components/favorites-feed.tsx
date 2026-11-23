import { ViewTransition } from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { ItemRow } from '@/features/item/components/item-row';
import { getFavorites } from '@/features/item/item-queries';

export async function FavoritesFeed() {
  const items = await getFavorites();
  if (items.length === 0) {
    return <EmptyState title="No favorites yet" body="Tap the heart on an item to save it here." />;
  }
  return (
    <div className="flex flex-col gap-0.5">
      {items.map((item, i) => (
        <ViewTransition key={item.id}>
          <div className="transition-opacity has-data-removing:opacity-50">
            <ItemRow item={item} index={i} />
          </div>
        </ViewTransition>
      ))}
    </div>
  );
}
