import { Skeleton } from '@/components/ui/skeleton';
import { AlbumArt } from '@/features/artwork/components/album-art';
import { CategoryPill } from '@/features/category/components/category-card';
import { getItem } from '@/features/item/item-queries';
import { formatDuration, formatCount } from '@/lib/utils';

export async function ItemHeader({ id }: { id: string }) {
  const item = await getItem(id);

  return (
    <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
      <AlbumArt
        coverColor={item.coverColor}
        coverSeed={item.id}
        label={item.title}
        kind="group"
        size="lg"
        className="!h-40 !w-40 shrink-0 !rounded-md shadow-2xl lg:!h-48 lg:!w-48"
      />
      <div className="flex min-w-0 flex-col items-center gap-1 text-center sm:items-start sm:text-left">
        <span className="text-muted text-xs font-bold tracking-widest uppercase">Item</span>
        <h1 className="text-2xl font-black tracking-tight text-black sm:text-3xl lg:text-4xl dark:text-white">
          {item.title}
        </h1>
        <p className="text-muted text-xs sm:text-sm">
          {item.subtitle} · {item.group} · {formatDuration(item.duration)} · {formatCount(item.viewCount)} views
        </p>
        <div className="mt-1">
          <CategoryPill category={item.category} />
        </div>
      </div>
    </div>
  );
}

export function ItemHeaderSkeleton() {
  return (
    <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
      <Skeleton className="skeleton-subtle h-40 w-40 shrink-0 rounded-md shadow-2xl lg:h-48 lg:w-48" />
      <div className="flex min-w-0 flex-1 flex-col items-center gap-1 sm:items-start">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-8 w-52 sm:h-9 sm:w-60" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-1 h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}
