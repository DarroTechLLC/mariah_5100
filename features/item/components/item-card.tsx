import { PrefetchLink } from '@/components/ui/prefetch-link';
import { Skeleton } from '@/components/ui/skeleton';
import { AlbumArt } from '@/features/artwork/components/album-art';
import { SelectButton } from '@/features/item/components/select-button';
import { SelectedItemTitle } from '@/features/item/components/item-interactions';
import type { Item } from '@/types/item';

export function ItemCard({ item }: { item: Item }) {
  return (
    <PrefetchLink
      href={`/item/${item.id}`}
      className="group bg-card/50 hover:bg-card dark:bg-card-dark/50 dark:hover:bg-card-dark flex flex-col gap-3 rounded-lg p-3 transition-colors"
    >
      <div className="relative">
        <AlbumArt
          coverColor={item.coverColor}
          coverSeed={item.id}
          label={item.title}
          size="lg"
          className="aspect-square !h-auto !w-full shadow-lg"
        />
        <SelectButton item={item} className="card-play-btn absolute right-2 bottom-2" />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <SelectedItemTitle itemId={item.id}>{item.title}</SelectedItemTitle>
        <span className="text-muted truncate text-xs">{item.subtitle}</span>
      </div>
    </PrefetchLink>
  );
}

export function ItemCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-lg p-3">
      <Skeleton className="skeleton-subtle aspect-square w-full rounded-md" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="skeleton-subtle h-4 w-3/4" />
        <Skeleton className="skeleton-subtle h-3 w-1/2" />
      </div>
    </div>
  );
}
