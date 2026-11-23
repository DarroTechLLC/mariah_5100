import { ViewTransition } from 'react';
import { PrefetchLink } from '@/components/ui/prefetch-link';
import { Skeleton } from '@/components/ui/skeleton';
import { AlbumArt } from '@/features/artwork/components/album-art';
import { collectionCoverPreloads } from '@/features/artwork/cover-assets';
import { SelectButton } from '@/features/item/components/select-button';
import type { CollectionWithItems } from '@/types/collection';

export function CollectionCard({ collection }: { collection: CollectionWithItems }) {
  const firstItem = collection.items[0];
  return (
    <PrefetchLink
      href={`/collection/${collection.id}`}
      preloadImageSources={collectionCoverPreloads(collection)}
      className="group bg-card/50 hover:bg-card dark:bg-card-dark/50 dark:hover:bg-card-dark flex flex-col gap-3 rounded-lg p-3 transition-colors"
    >
      <div className="relative">
        <AlbumArt
          coverColor={collection.coverColor}
          coverSeed={collection.id}
          label={collection.name}
          kind="collection"
          size="lg"
          className="aspect-square !h-auto !w-full shadow-lg"
        />
        {firstItem && <SelectButton item={firstItem} className="card-play-btn absolute right-2 bottom-2" />}
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-sm font-semibold text-black dark:text-white">{collection.name}</span>
        <span className="text-muted truncate text-xs">
          {collection.itemCount} {collection.itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>
    </PrefetchLink>
  );
}

export function CollectionList({
  collections,
  animateItems = false,
}: {
  collections: CollectionWithItems[];
  animateItems?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {collections.map(pl =>
        animateItems ? (
          <ViewTransition key={pl.id}>
            <CollectionCard collection={pl} />
          </ViewTransition>
        ) : (
          <CollectionCard key={pl.id} collection={pl} />
        ),
      )}
    </div>
  );
}

export function CollectionCardSkeleton() {
  return (
    <div className="rounded-lg p-3">
      <Skeleton className="skeleton-subtle aspect-square w-full rounded-md" />
    </div>
  );
}

export function CollectionListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <CollectionCardSkeleton key={i} />
      ))}
    </div>
  );
}
