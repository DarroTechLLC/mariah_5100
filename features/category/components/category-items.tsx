import { EmptyState } from '@/components/ui/empty-state';
import { ItemList } from '@/features/item/components/item-row';
import { getItemsByCategory } from '@/features/item/item-queries';

export async function CategoryItems({ category }: { category: string }) {
  const items = await getItemsByCategory(category);
  if (items.length === 0) {
    return <EmptyState title="No items" body={`No items in ${category} yet.`} />;
  }
  return <ItemList items={items} showIndex collapseAfter={5} />;
}
