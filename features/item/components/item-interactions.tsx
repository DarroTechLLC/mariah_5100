'use client';

import { Heart, MousePointer2 } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';
import { Boundary } from '@/components/demo/boundary';
import { PrefetchLink } from '@/components/ui/prefetch-link';
import { toggleFavorite } from '@/features/item/item-actions';
import { cn } from '@/lib/utils';
import { useSelection } from '@/providers/selection-provider';
import type { Item } from '@/types/item';
import type { Route } from 'next';

export function ItemSelectRow({ item, children }: { item: Item; children: React.ReactNode }) {
  const selection = useSelection();
  const isSelected = selection.item?.id === item.id;

  function handleClick() {
    if (isSelected) {
      selection.clear();
    } else {
      selection.select({
        coverColor: item.coverColor,
        id: item.id,
        subtitle: item.subtitle,
        title: item.title,
      });
    }
  }

  return (
    <Boundary label="ItemSelectRow">
      <article
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={e => {
          if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={isSelected ? `Clear ${item.title}` : `Select ${item.title}`}
        className={cn(
          'group/item cursor-pointer rounded-md transition-colors',
          isSelected ? 'bg-card/40 dark:bg-card-dark/40' : 'hover:bg-card/60 dark:hover:bg-card-dark/60',
        )}
      >
        {children}
      </article>
    </Boundary>
  );
}

export function ItemLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <PrefetchLink
      href={href as Route}
      onClick={e => e.stopPropagation()}
      className={cn(
        'cursor-default truncate text-sm font-medium hover:cursor-pointer hover:underline',
        className ?? 'text-black dark:text-white',
      )}
    >
      {children}
    </PrefetchLink>
  );
}

export function SelectedItemLink({
  itemId,
  href,
  children,
}: {
  itemId: string;
  href: string;
  children: React.ReactNode;
}) {
  const selection = useSelection();
  const isSelected = selection.item?.id === itemId;
  return (
    <ItemLink href={href} className={isSelected ? 'text-accent' : 'text-black dark:text-white'}>
      {children}
    </ItemLink>
  );
}

export function SelectedItemTitle({
  itemId,
  children,
  className,
}: {
  itemId: string;
  children: React.ReactNode;
  className?: string;
}) {
  const selection = useSelection();
  const isSelected = selection.item?.id === itemId;
  return (
    <span
      className={cn(
        'truncate text-sm font-semibold',
        isSelected ? 'text-accent' : (className ?? 'text-black dark:text-white'),
      )}
    >
      {children}
    </span>
  );
}

export function ItemIndexCell({ itemId, index }: { itemId: string; index?: number }) {
  const selection = useSelection();
  const isSelected = selection.item?.id === itemId;

  if (isSelected) {
    return (
      <span className="text-accent flex w-5 justify-center text-xs font-bold">
        {index !== undefined ? index + 1 : '•'}
      </span>
    );
  }

  return (
    <span className="w-5 text-right">
      {index !== undefined ? (
        <>
          <span className="text-muted font-mono text-xs group-hover/item:hidden [@media(hover:none)]:hidden">
            {index + 1}
          </span>
          <MousePointer2 className="hidden h-3.5 w-3.5 text-black group-hover/item:inline dark:text-white [@media(hover:none)]:inline" />
        </>
      ) : (
        <MousePointer2 className="hidden h-3.5 w-3.5 text-black group-hover/item:inline dark:text-white [@media(hover:none)]:inline" />
      )}
    </span>
  );
}

export function FavoriteButton({
  itemId,
  isFavorite,
  size = 'sm',
}: {
  itemId: string;
  isFavorite: boolean;
  size?: 'sm' | 'lg';
}) {
  const [, startTransition] = useTransition();
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(isFavorite);
  const [removing, setRemoving] = useOptimistic(false);

  function handleToggle(e: React.MouseEvent) {
    e.stopPropagation();
    const willRemove = optimisticFavorite;
    startTransition(async () => {
      setOptimisticFavorite(!optimisticFavorite);
      if (willRemove) setRemoving(true);
      await toggleFavorite(itemId);
    });
  }

  return (
    <Boundary label="FavoriteButton">
      <button
        type="button"
        onClick={handleToggle}
        data-removing={removing || undefined}
        aria-label={optimisticFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className={cn(
          'rounded-full p-1.5 transition-colors',
          optimisticFavorite
            ? 'text-accent hover:text-accent-hover'
            : 'text-gray hover:text-black dark:hover:text-white',
        )}
      >
        <Heart className={cn(size === 'lg' ? 'h-5 w-5' : 'h-4 w-4', optimisticFavorite && 'fill-current')} />
      </button>
    </Boundary>
  );
}
