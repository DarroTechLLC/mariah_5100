import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import { PageWrapper } from '@/components/ui/page-layout';
import { TopCategoriesGrid } from '@/features/category/components/category-browse';
import { CollectionBrowse } from '@/features/collection/components/collection-browse';
import { MostViewed, MostViewedSkeleton } from '@/features/item/components/most-viewed';
import { QuickSelectGrid, QuickSelectGridSkeleton } from '@/features/item/components/quick-select-grid';

export default function HomePage() {
  return (
    <PageWrapper title="Welcome back">
      <h2 className="mb-4">Recently Viewed</h2>
      <AnimatedSuspense fallback={<QuickSelectGridSkeleton />}>
        <QuickSelectGrid />
      </AnimatedSuspense>
      <h2 className="mt-10 mb-4">Most Viewed</h2>
      <AnimatedSuspense fallback={<MostViewedSkeleton />}>
        <MostViewed />
        <section className="mt-10">
          <h2 className="mb-4">Your Collections</h2>
          <CollectionBrowse />
        </section>
        <section className="mt-10">
          <h2 className="mb-4">Browse Categories</h2>
          <TopCategoriesGrid />
        </section>
      </AnimatedSuspense>
    </PageWrapper>
  );
}
