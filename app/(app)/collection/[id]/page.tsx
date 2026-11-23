import { ViewTransition } from 'react';
import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PageWrapper } from '@/components/ui/page-layout';
import { CollectionBrowse } from '@/features/collection/components/collection-browse';
import { CollectionListSkeleton } from '@/features/collection/components/collection-card';
import { CollectionDetail, CollectionDetailSkeleton } from '@/features/collection/components/collection-detail';
import { getCollection } from '@/features/collection/collection-queries';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<'/collection/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const collection = await getCollection(id);
  return { title: collection.name };
}

export default function CollectionDetailPage({ params }: PageProps<'/collection/[id]'>) {
  return (
    <PageWrapper>
      <AnimatedSuspense fallback={<CollectionDetailSkeleton />}>
        {params.then(({ id }) => (
          <>
            <CollectionDetail id={id} />
            <ViewTransition>
              <section className="mt-10">
                <h2 className="mb-4">Other Collections</h2>
                <ErrorBoundary title="Couldn't load other collections">
                  <AnimatedSuspense fallback={<CollectionListSkeleton count={3} />}>
                    <CollectionBrowse excludeId={id} />
                  </AnimatedSuspense>
                </ErrorBoundary>
              </section>
            </ViewTransition>
          </>
        ))}
      </AnimatedSuspense>
    </PageWrapper>
  );
}
