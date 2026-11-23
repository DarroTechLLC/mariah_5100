import { Collapsible } from '@/components/ui/collapsible';
import { ItemCard, ItemCardSkeleton } from '@/features/item/components/item-card';
import { getLibrary } from '@/features/item/item-queries';

const INITIAL_VISIBLE = 20;
const gridClass = 'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';

export async function LibraryGrid() {
  const { items } = await getLibrary();
  const visible = items.slice(0, INITIAL_VISIBLE);
  const overflow = items.slice(INITIAL_VISIBLE);

  return (
    <>
      <div className={gridClass}>
        {visible.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      {overflow.length > 0 && (
        <Collapsible showMoreLabel={`Show ${overflow.length} more`}>
          <div className={gridClass}>
            {overflow.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </Collapsible>
      )}
    </>
  );
}

export function LibraryGridSkeleton() {
  return (
    <div className={gridClass}>
      {Array.from({ length: 5 }).map((_, i) => (
        <ItemCardSkeleton key={i} />
      ))}
    </div>
  );
}
