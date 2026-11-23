'use client';

import * as Ariakit from '@ariakit/react';
import { ListPlus, Plus } from 'lucide-react';
import { use } from 'react';
import { Boundary } from '@/components/demo/boundary';
import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import { Skeleton } from '@/components/ui/skeleton';
import { AddToCollectionButtons, NewCollectionDialog } from '@/features/collection/components/collection-interactions';
import type { CollectionMenuItem } from '@/types/collection';

export function AddToCollectionMenu({
  itemId,
  itemsPromise,
  size = 'sm',
}: {
  itemId: string;
  itemsPromise: Promise<CollectionMenuItem[]>;
  size?: 'sm' | 'lg';
}) {
  const menu = Ariakit.useMenuStore({ placement: 'bottom-start' });
  const dialog = Ariakit.useDialogStore();

  return (
    <>
      <Boundary label="AddToCollection">
        <Ariakit.MenuButton
          store={menu}
          aria-label="Add to collection"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className={`text-gray data-[open]:text-accent dark:data-[open]:text-accent rounded-full transition-colors hover:text-black dark:hover:text-white ${size === 'lg' ? 'p-1.5' : 'p-1.5'}`}
        >
          <ListPlus className={size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
        </Ariakit.MenuButton>
      </Boundary>
      <Ariakit.Menu
        store={menu}
        portal
        className="border-divider dark:border-divider-dark z-50 w-56 rounded-xl border bg-white p-2 shadow-xl outline-none dark:bg-black"
        style={{ viewTransitionName: 'add-to-collection-menu' }}
        gutter={8}
        unmountOnHide
      >
        <Boundary label="AddToCollection">
          <p className="text-muted mb-1 px-3 py-1 text-xs font-semibold">Add to Collection</p>
          <AnimatedSuspense fallback={<CollectionMenuItemsSkeleton />}>
            <CollectionMenuItems itemId={itemId} itemsPromise={itemsPromise} />
          </AnimatedSuspense>
          <div className="border-divider dark:border-divider-dark my-1 border-t" />
          <Ariakit.MenuItem
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              dialog.show();
            }}
            className="hover:bg-card dark:hover:bg-card-dark data-active-item:bg-card dark:data-active-item:bg-card-dark flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-black transition-colors outline-none dark:text-white"
          >
            <Plus className="h-4 w-4 shrink-0" />
            New collection
          </Ariakit.MenuItem>
        </Boundary>
      </Ariakit.Menu>
      <NewCollectionDialog store={dialog} itemId={itemId} />
    </>
  );
}

function CollectionMenuItems({ itemId, itemsPromise }: { itemId: string; itemsPromise: Promise<CollectionMenuItem[]> }) {
  const items = use(itemsPromise);
  if (items.length === 0) {
    return <p className="text-muted px-3 py-2 text-xs">Create a collection first.</p>;
  }
  return <AddToCollectionButtons itemId={itemId} items={items} />;
}

function CollectionMenuItemsSkeleton() {
  return (
    <div className="flex flex-col gap-0.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 rounded-md px-3 py-2">
          <Skeleton className="h-4 w-4 shrink-0" />
          <Skeleton className={`h-4 ${i === 0 ? 'w-24' : i === 1 ? 'w-20' : 'w-28'}`} />
        </div>
      ))}
    </div>
  );
}
