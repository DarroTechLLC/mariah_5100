import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { AlbumArt } from '@/features/artwork/components/album-art';
import { DeleteCollectionButton } from '@/features/collection/components/collection-interactions';
import { CollectionItemList } from '@/features/collection/components/collection-item-list';
import { getCollection } from '@/features/collection/collection-queries';
import { SelectButton } from '@/features/item/components/select-button';
import { ItemListSkeleton } from '@/features/item/components/item-row';

export async function CollectionDetail({ id }: { id: string }) {
  const collection = await getCollection(id);
  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
        <AlbumArt
          coverColor={collection.coverColor}
          coverSeed={collection.id}
          label={collection.name}
          kind="collection"
          size="lg"
          className="!h-40 !w-40 !rounded-md shadow-2xl sm:!h-48 sm:!w-48"
        />
        <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <span className="text-muted text-xs font-bold tracking-widest uppercase">Collection</span>
          <h1 className="text-2xl font-black tracking-tight text-black sm:text-4xl dark:text-white">{collection.name}</h1>
          {collection.description ? <p className="text-muted text-xs sm:text-sm">{collection.description}</p> : null}
          <p className="text-muted text-xs">
            {collection.itemCount} {collection.itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>
      <div className="mb-6 flex items-center gap-4">
        {collection.items.length > 0 ? (
          <SelectButton item={collection.items[0]} className="!h-14 !w-14 [&_svg]:!h-6 [&_svg]:!w-6" />
        ) : null}
        <DeleteCollectionButton collectionId={id} size="lg" />
      </div>
      {collection.items.length === 0 ? (
        <EmptyState title="Empty collection" body="Add some items to get started." />
      ) : (
        <CollectionItemList collectionId={id} items={collection.items} />
      )}
    </>
  );
}

export function CollectionDetailSkeleton() {
  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
        <span
          aria-hidden
          className="dark:bg-divider-dark block h-40 w-40 shrink-0 rounded-md bg-zinc-300 shadow-2xl sm:h-48 sm:w-48"
        />
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-9 w-44 sm:h-11 sm:w-52" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3.5 w-28" />
        </div>
      </div>
      <div className="mb-6 flex items-center gap-4">
        <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
        <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
      </div>
      <ItemListSkeleton count={4} showIndex />
    </>
  );
}
