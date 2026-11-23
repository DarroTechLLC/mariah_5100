import { Plus } from 'lucide-react';
import { Suspense } from 'react';
import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import { IconButtonLink, IconButtonLinkSkeleton } from '@/components/ui/icon-button-link';
import { PageWrapper } from '@/components/ui/page-layout';
import { TopCategoriesGrid } from '@/features/category/components/category-browse';
import { CollectionBrowse } from '@/features/collection/components/collection-browse';
import { LibraryGrid, LibraryGridSkeleton } from '@/features/item/components/library-grid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library',
};

export default function LibraryPage() {
  return (
    <PageWrapper title="Library">
      <h2 className="mb-4">All Items</h2>
      <AnimatedSuspense fallback={<LibraryGridSkeleton />}>
        <div className="mb-10">
          <LibraryGrid />
        </div>
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <h2>Your Collections</h2>
            <Suspense fallback={<IconButtonLinkSkeleton />}>
              <IconButtonLink href="/collection" label="Create collection">
                <Plus className="h-5 w-5" />
              </IconButtonLink>
            </Suspense>
          </div>
          <CollectionBrowse />
        </section>
        <section>
          <h2 className="mb-4">Categories</h2>
          <TopCategoriesGrid />
        </section>
      </AnimatedSuspense>
    </PageWrapper>
  );
}
