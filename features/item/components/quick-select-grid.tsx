import { Library } from 'lucide-react';
import { ViewTransition } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { AlbumArt } from '@/features/artwork/components/album-art';
import { ItemSelectRow, SelectedItemLink, ItemIndexCell } from '@/features/item/components/item-interactions';
import { getRecentlyViewed } from '@/features/item/item-queries';

const SLOTS = 6;

export async function QuickSelectGrid() {
  const items = await getRecentlyViewed(SLOTS);
  const fillers = SLOTS - items.length;

  return (
    <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(item => (
        <ViewTransition key={item.id}>
          <ItemSelectRow item={item}>
            <div className="bg-card/60 hover:bg-card dark:bg-card-dark/60 dark:hover:bg-card-dark group/quick flex items-center gap-3 rounded-md px-3 py-2 transition-colors">
              <ItemIndexCell itemId={item.id} />
              <AlbumArt
                coverColor={item.coverColor}
                coverSeed={item.id}
                label={item.title}
                size="sm"
                className="!h-10 !w-10 !rounded-md"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <SelectedItemLink itemId={item.id} href={`/item/${item.id}`}>
                  {item.title}
                </SelectedItemLink>
                <span className="text-muted truncate text-xs">{item.subtitle}</span>
              </div>
            </div>
          </ItemSelectRow>
        </ViewTransition>
      ))}
      {Array.from({ length: fillers }).map((_, i) => (
        <div key={`filler-${i}`} aria-hidden className="flex items-center gap-3 rounded-md px-3 py-2 opacity-0">
          <span className="w-5" />
          <span className="h-10 w-10 shrink-0 rounded-md" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="h-4 w-24" />
            <span className="h-3 w-16" />
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <Library size={32} className="text-divider dark:text-divider-dark" />
          <p className="text-sm font-medium text-black dark:text-white">Nothing viewed yet</p>
          <p className="text-gray max-w-xs text-sm">Select an item and it&apos;ll show up here.</p>
        </div>
      )}
    </div>
  );
}

export function QuickSelectGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: SLOTS }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-md px-3 py-2">
          <span className="w-5" />
          <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
