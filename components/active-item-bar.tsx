'use client';

import { X } from 'lucide-react';
import { Boundary } from '@/components/demo/boundary';
import { AlbumArt } from '@/features/artwork/components/album-art';
import { PrefetchLink } from '@/components/ui/prefetch-link';
import { useSelection } from '@/providers/selection-provider';
import type { Route } from 'next';

export function ActiveItemBar() {
  const { item, clear } = useSelection();

  return (
    <>
      {item ? (
        <Boundary label="ActiveItemBar">
          <div
            style={{ viewTransitionName: 'player-bar' }}
            className="border-divider dark:border-divider-dark shrink-0 border-t bg-white px-4 py-2 sm:hidden dark:bg-[#181818]"
          >
            <div className="flex items-center gap-3">
              <AlbumArt
                coverColor={item.coverColor}
                coverSeed={item.id}
                label={item.title}
                size="sm"
                className="!h-12 !w-12 !rounded-sm"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <ItemInfo title={item.title} subtitle={item.subtitle} href={`/item/${item.id}`} />
              </div>
              <button
                type="button"
                onClick={clear}
                className="text-muted p-1 transition-colors hover:text-black dark:hover:text-white"
                aria-label="Clear selection"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Boundary>
      ) : null}

      <Boundary label="ActiveItemBar">
        <div
          style={{ viewTransitionName: 'player-bar-desktop' }}
          className="border-divider dark:border-divider-dark hidden shrink-0 border-t bg-white px-4 py-2 sm:block dark:bg-[#181818]"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <AlbumArt
                coverColor={item?.coverColor ?? 'from-gray-400 to-gray-600'}
                coverSeed={item?.id}
                label={item?.title}
                size="sm"
                className="!h-14 !w-14 !rounded-sm"
              />
              <ItemInfo
                title={item?.title ?? 'No item selected'}
                subtitle={item?.subtitle ?? 'Select an item'}
                href={item ? `/item/${item.id}` : undefined}
              />
            </div>
            {item ? (
              <button
                type="button"
                onClick={clear}
                className="text-muted rounded-full p-2 transition-colors hover:text-black dark:hover:text-white"
                aria-label="Clear selection"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
      </Boundary>
    </>
  );
}

function ItemInfo({ title, subtitle, href }: { title: string; subtitle: string; href?: string }) {
  const content = (
    <div className="flex min-w-0 flex-col">
      <span className="truncate text-sm font-medium text-black dark:text-white">{title}</span>
      <span className="text-muted truncate text-xs">{subtitle}</span>
    </div>
  );
  if (!href) return content;
  return (
    <PrefetchLink href={href as Route} className="min-w-0 hover:underline">
      {content}
    </PrefetchLink>
  );
}
