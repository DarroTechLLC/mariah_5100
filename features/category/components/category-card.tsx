import { PrefetchLink } from '@/components/ui/prefetch-link';
import { Skeleton } from '@/components/ui/skeleton';
import { AlbumArtCover } from '@/features/artwork/components/album-art-cover';
import type { CategorySummary } from '@/types/category';

const categoryColors: Record<string, string> = {
  docs: 'from-pink-400/80 to-rose-500/80',
  guides: 'from-rose-300/80 to-pink-400/80',
  templates: 'from-pink-300/80 to-rose-400/80',
  tools: 'from-rose-400/80 to-pink-600/80',
};

export function CategoryPill({ category }: { category: string }) {
  return (
    <PrefetchLink
      href={`/category/${category}`}
      className="bg-accent/10 text-accent hover:bg-accent/20 rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors"
    >
      {category}
    </PrefetchLink>
  );
}

export function CategoryCard({ category }: { category: CategorySummary }) {
  const gradient = categoryColors[category.category] ?? 'from-gray-500 to-gray-700';
  return (
    <PrefetchLink
      href={`/category/${category.category}`}
      className="group relative overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
    >
      <div className={`relative flex h-28 items-end bg-gradient-to-br p-4 ${gradient}`}>
        <AlbumArtCover seed={category.category} label={category.category} kind="category" />
        <div className="relative z-20">
          <span className="text-lg font-bold text-white capitalize drop-shadow-md">{category.category}</span>
          <p className="text-xs text-white/70">
            {category.count} {category.count === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>
    </PrefetchLink>
  );
}

export function CategoryGrid({ categories }: { categories: CategorySummary[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {categories.map(g => (
        <CategoryCard key={g.category} category={g} />
      ))}
    </div>
  );
}

export function CategoryGridSkeleton() {
  return (
    <>
      <Skeleton className="skeleton-subtle mb-4 h-7 w-28" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="skeleton-subtle h-28 rounded-lg" />
        ))}
      </div>
    </>
  );
}
