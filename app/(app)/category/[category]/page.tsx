import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import { Skeleton } from '@/components/ui/skeleton';
import { CategoryItems } from '@/features/category/components/category-items';
import { ItemListSkeleton } from '@/features/item/components/item-row';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<'/category/[category]'>): Promise<Metadata> {
  const { category } = await params;
  const label = decodeURIComponent(category);
  return { title: label.charAt(0).toUpperCase() + label.slice(1) };
}

export default function CategoryDetailPage({ params }: PageProps<'/category/[category]'>) {
  return (
    <div>
      <AnimatedSuspense
        fallback={
          <>
            <Skeleton className="mb-6 h-9 w-40" />
            <ItemListSkeleton count={5} showIndex showMore />
          </>
        }
      >
        {params.then(({ category }) => {
          const label = decodeURIComponent(category);
          return (
            <>
              <h1 className="mb-6 text-3xl font-bold capitalize">{label}</h1>
              <CategoryItems category={label} />
            </>
          );
        })}
      </AnimatedSuspense>
    </div>
  );
}
