import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PageWrapper } from '@/components/ui/page-layout';
import { TopCategoriesGrid, TopCategoriesGridSkeleton } from '@/features/category/components/category-browse';

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      {children}
      <section className="mt-10">
        <h2 className="mb-4">Explore Other Categories</h2>
        <ErrorBoundary title="Couldn't load other categories">
          <AnimatedSuspense fallback={<TopCategoriesGridSkeleton />}>
            <TopCategoriesGrid />
          </AnimatedSuspense>
        </ErrorBoundary>
      </section>
    </PageWrapper>
  );
}
