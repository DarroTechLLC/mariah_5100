import { ViewTransition } from 'react';
import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PageWrapper } from '@/components/ui/page-layout';
import { TopCategoriesGrid } from '@/features/category/components/category-browse';
import { Discover, DiscoverSkeleton } from '@/features/item/components/discover';
import { FavoritesFeed } from '@/features/item/components/favorites-feed';
import { ItemListSkeleton } from '@/features/item/components/item-row';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favorites',
};

export default function FavoritesPage() {
  return (
    <PageWrapper title="Favorites">
      <AnimatedSuspense fallback={<ItemListSkeleton count={5} showIndex />}>
        <FavoritesFeed />
        <ViewTransition>
          <section>
            <h2 className="mt-10 mb-4">You Might Also Like</h2>
            <ErrorBoundary title="Couldn't load recommendations">
              <AnimatedSuspense fallback={<DiscoverSkeleton />}>
                <Discover />
                <section className="mt-10">
                  <h2 className="mb-4">Explore Categories</h2>
                  <TopCategoriesGrid />
                </section>
              </AnimatedSuspense>
            </ErrorBoundary>
          </section>
        </ViewTransition>
      </AnimatedSuspense>
    </PageWrapper>
  );
}
