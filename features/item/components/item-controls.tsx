import { Skeleton } from '@/components/ui/skeleton';
import { AddToCollectionMenu } from '@/features/collection/components/add-to-collection-menu';
import { getCollectionMenuItems } from '@/features/collection/collection-queries';
import { SelectButton } from '@/features/item/components/select-button';
import { FavoriteButton } from '@/features/item/components/item-interactions';
import { getItem } from '@/features/item/item-queries';

export async function ItemControls({ id }: { id: string }) {
  const item = await getItem(id);

  return (
    <div className="mb-8 flex items-center gap-4" style={{ viewTransitionName: 'item-controls' }}>
      <SelectButton item={item} className="!h-14 !w-14 [&_svg]:!h-6 [&_svg]:!w-6" />
      <FavoriteButton itemId={item.id} isFavorite={item.isFavorite} size="lg" />
      <AddToCollectionMenu itemId={item.id} itemsPromise={getCollectionMenuItems(item.id)} size="lg" />
    </div>
  );
}

export function ItemControlsSkeleton() {
  return (
    <div className="mb-8 flex items-center gap-4" style={{ viewTransitionName: 'item-controls' }}>
      <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
      <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
      <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
    </div>
  );
}
