import { EmptyState } from '@/components/ui/empty-state';
import { CollectionList } from '@/features/collection/components/collection-card';
import { getCollections } from '@/features/collection/collection-queries';

export async function CollectionBrowse({ excludeId, animateItems }: { excludeId?: string; animateItems?: boolean } = {}) {
  const collections = await getCollections();
  const filtered = excludeId ? collections.filter(p => p.id !== excludeId) : collections;
  if (filtered.length === 0) {
    if (excludeId) return null;
    return <EmptyState title="No collections" body="Create your first collection." />;
  }
  return <CollectionList collections={filtered} animateItems={animateItems} />;
}
