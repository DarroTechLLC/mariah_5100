import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PageWrapper } from '@/components/ui/page-layout';
import { CategoryBrowse, CategoryBrowseSkeleton } from '@/features/category/components/category-browse';
import { Search } from '@/features/search/components/search';
import { SearchResults } from '@/features/search/components/search-results';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
};

export default function SearchPage({ searchParams }: PageProps<'/search'>) {
  return (
    <PageWrapper title="Search">
      <Search>
        <ErrorBoundary title="Search is taking a breather">
          <AnimatedSuspense fallback={<CategoryBrowseSkeleton />}>
            {searchParams.then(sp => {
              const q = typeof sp.q === 'string' ? sp.q : '';
              if (!q) {
                return (
                  <>
                    <h2 className="mb-4">Browse All</h2>
                    <CategoryBrowse />
                  </>
                );
              }
              return <SearchResults query={q} />;
            })}
          </AnimatedSuspense>
        </ErrorBoundary>
      </Search>
    </PageWrapper>
  );
}
