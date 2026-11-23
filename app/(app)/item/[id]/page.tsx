import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PageWrapper } from '@/components/ui/page-layout';
import { ItemControls, ItemControlsSkeleton } from '@/features/item/components/item-controls';
import { ItemHeader, ItemHeaderSkeleton } from '@/features/item/components/item-header';
import { RecommendedItems, ItemListSkeleton } from '@/features/item/components/item-row';
import { getItem } from '@/features/item/item-queries';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps<'/item/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(id);
  return { title: item.title };
}

export default function ItemPage({ params }: PageProps<'/item/[id]'>) {
  return (
    <PageWrapper>
      <AnimatedSuspense
        fallback={
          <>
            <ItemHeaderSkeleton />
            <ItemControlsSkeleton />
          </>
        }
      >
        {params.then(({ id }) => (
          <>
            <ItemHeader id={id} />
            <ItemControls id={id} />
          </>
        ))}
      </AnimatedSuspense>
      <section>
        <h2 className="mb-4">More items you might like</h2>
        <ErrorBoundary title="Couldn't load recommendations">
          <AnimatedSuspense fallback={<ItemListSkeleton count={3} />}>
            {params.then(({ id }) => (
              <RecommendedItems itemId={id} />
            ))}
          </AnimatedSuspense>
        </ErrorBoundary>
      </section>
    </PageWrapper>
  );
}
