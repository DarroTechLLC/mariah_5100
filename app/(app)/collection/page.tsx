import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import { PageWrapper } from '@/components/ui/page-layout';
import { CreateCollectionForm } from '@/features/collection/components/create-collection-form';
import { CollectionBrowse } from '@/features/collection/components/collection-browse';
import { CollectionListSkeleton } from '@/features/collection/components/collection-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collections',
};

export default function CollectionsPage() {
  return (
    <PageWrapper title="Collections">
      <div className="mb-6 max-w-md">
        <CreateCollectionForm />
      </div>
      <AnimatedSuspense fallback={<CollectionListSkeleton count={3} />}>
        <CollectionBrowse animateItems />
      </AnimatedSuspense>
    </PageWrapper>
  );
}
