import { EmptyState } from '@/components/ui/empty-state';
import { CollectionList } from '@/features/collection/components/collection-card';
import { searchCollections } from '@/features/collection/collection-queries';
import { ItemList } from '@/features/item/components/item-row';
import { searchItems } from '@/features/item/item-queries';

export async function SearchResults({ query }: { query: string }) {
  const [items, collections] = await Promise.all([searchItems(query), searchCollections(query)]);

  if (items.length === 0 && collections.length === 0) {
    return <EmptyState title="No results" body={`No items or collections match "${query}".`} />;
  }

  return (
    <div className="flex flex-col gap-10">
      {items.length > 0 && (
        <section>
          <h2 className="mb-4">Items</h2>
          <ItemList items={items} />
        </section>
      )}
      {collections.length > 0 && (
        <section>
          <h2 className="mb-4">Collections</h2>
          <CollectionList collections={collections} />
        </section>
      )}
    </div>
  );
}
