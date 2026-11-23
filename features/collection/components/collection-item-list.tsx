import { ViewTransition } from 'react';
import { RemoveFromCollectionButton } from '@/features/collection/components/collection-interactions';
import { ItemRow } from '@/features/item/components/item-row';
import type { Item } from '@/types/item';

export function CollectionItemList({ collectionId, items }: { collectionId: string; items: Item[] }) {
  return (
    <div className="flex flex-col gap-0.5">
      {items.map((item, i) => (
        <ViewTransition key={item.id}>
          <div className="flex items-center transition-opacity has-data-pending:opacity-30">
            <div className="min-w-0 flex-1">
              <ItemRow item={item} index={i} />
            </div>
            <RemoveFromCollectionButton collectionId={collectionId} itemId={item.id} />
          </div>
        </ViewTransition>
      ))}
    </div>
  );
}
