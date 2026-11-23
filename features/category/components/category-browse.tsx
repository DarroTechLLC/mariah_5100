import { Skeleton } from '@/components/ui/skeleton';
import { CategoryCard, CategoryGrid } from '@/features/category/components/category-card';
import { getCategories } from '@/features/category/category-queries';

export async function CategoryBrowse() {
  const categories = await getCategories();
  return <CategoryGrid categories={categories} />;
}

export { CategoryGridSkeleton as CategoryBrowseSkeleton } from '@/features/category/components/category-card';

export async function TopCategoriesGrid() {
  const categories = (await getCategories()).slice(0, 6);
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {categories.map(g => (
        <CategoryCard key={g.category} category={g} />
      ))}
    </div>
  );
}

export function TopCategoriesGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="skeleton-subtle h-28 rounded-lg" />
      ))}
    </div>
  );
}
