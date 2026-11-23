import { navigation } from 'next/cache';
import { ViewTransition } from 'react';
import { Collapsible } from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';
import { AlbumArt } from '@/features/artwork/components/album-art';
import { AddToCollectionMenu } from '@/features/collection/components/add-to-collection-menu';
import { getCollectionMenuItems } from '@/features/collection/collection-queries';
import {
  FavoriteButton,
  ItemIndexCell,
  ItemSelectRow,
  SelectedItemLink,
} from '@/features/item/components/item-interactions';
import { getRecommendedItems, getUserFavoriteIds } from '@/features/item/item-queries';
import { formatDuration, formatCount } from '@/lib/utils';
import type { Item as ItemT } from '@/types/item';

type Props = {
  item: ItemT;
  index?: number;
  showGroup?: boolean;
};

export async function ItemRow({ item, index, showGroup = true }: Props) {
  const favoriteIds = await getUserFavoriteIds();
  const isFavorite = item.isFavorite || favoriteIds.has(item.id);
  return (
    <ItemSelectRow item={item}>
      <div className="flex items-center gap-3 px-3 py-2">
        <ItemIndexCell itemId={item.id} index={index} />
        <AlbumArt coverColor={item.coverColor} coverSeed={item.id} label={item.title} size="sm" />
        <div className="flex min-w-0 flex-1 flex-col">
          <SelectedItemLink itemId={item.id} href={`/item/${item.id}`}>
            {item.title}
          </SelectedItemLink>
          <span className="text-muted truncate text-xs">
            {item.subtitle}
            {showGroup ? ` · ${item.group}` : ''}
          </span>
        </div>
        <span className="text-muted hidden text-xs sm:block">{formatCount(item.viewCount)} views</span>
        <span className="text-muted font-mono text-xs">{formatDuration(item.duration)}</span>
        <FavoriteButton itemId={item.id} isFavorite={isFavorite} />
        <AddToCollectionMenu itemId={item.id} itemsPromise={getCollectionMenuItems(item.id)} />
      </div>
    </ItemSelectRow>
  );
}

export async function RecommendedItems({ itemId }: { itemId: string }) {
  await navigation();
  const items = await getRecommendedItems(itemId);
  return (
    <div data-testid="recommended-items">
      <ItemList items={items} animateItems />
    </div>
  );
}

export function ItemList({
  items,
  showIndex = false,
  collapseAfter,
  animateItems = false,
}: {
  items: ItemT[];
  showIndex?: boolean;
  collapseAfter?: number;
  animateItems?: boolean;
}) {
  const shouldCollapse = collapseAfter !== undefined && items.length > collapseAfter;
  const visible = shouldCollapse ? items.slice(0, collapseAfter) : items;
  const overflow = shouldCollapse ? items.slice(collapseAfter) : [];

  const row = (item: ItemT, index?: number) => {
    const node = <ItemRow key={item.id} item={item} index={index} />;
    return animateItems ? <ViewTransition key={item.id}>{node}</ViewTransition> : node;
  };

  return (
    <>
      <div className="flex flex-col gap-0.5">{visible.map((item, i) => row(item, showIndex ? i : undefined))}</div>
      {overflow.length > 0 && (
        <Collapsible showMoreLabel={`Show ${overflow.length} more`}>
          {overflow.map((item, i) => row(item, showIndex ? visible.length + i : undefined))}
        </Collapsible>
      )}
    </>
  );
}

export function ItemRowSkeleton({ showIndex = false, index }: { showIndex?: boolean; index?: number }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      {showIndex ? (
        <span className="text-muted w-5 text-right font-mono text-xs">{(index ?? 0) + 1}</span>
      ) : (
        <span className="w-5" />
      )}
      <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Skeleton className="h-3.5 w-28 max-w-full" />
        <Skeleton className="h-3 w-20 max-w-full" />
      </div>
      <Skeleton className="hidden h-3 w-14 sm:block" />
      <Skeleton className="h-3 w-8" />
      <span className="p-1.5">
        <Skeleton className="h-4 w-4 rounded-full" />
      </span>
      <span className="p-1.5">
        <Skeleton className="h-4 w-4 rounded-full" />
      </span>
    </div>
  );
}

export function ItemListSkeleton({
  count = 5,
  showIndex = false,
  showMore = false,
}: {
  count?: number;
  showIndex?: boolean;
  showMore?: boolean;
}) {
  return (
    <>
      <div className="flex flex-col gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
          <ItemRowSkeleton key={i} showIndex={showIndex} index={i} />
        ))}
      </div>
      {showMore && <Skeleton className="skeleton-subtle mt-3 h-5 w-24" />}
    </>
  );
}
