'use client';

import { Check, MousePointer2 } from 'lucide-react';
import { Boundary } from '@/components/demo/boundary';
import { useSelection } from '@/providers/selection-provider';
import type { Item } from '@/types/item';

type Props = {
  item: Item;
  className?: string;
  size?: 'sm' | 'md';
};

const sizes = {
  md: 'h-10 w-10',
  sm: 'h-8 w-8',
};

const iconSizes = {
  md: 'h-5 w-5',
  sm: 'h-4 w-4',
};

export function SelectButton({ item, className, size = 'md' }: Props) {
  const selection = useSelection();
  const isSelected = selection.item?.id === item.id;

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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
    <Boundary label="SelectButton">
      <button
        type="button"
        onClick={handleClick}
        data-selected={isSelected || undefined}
        aria-label={isSelected ? `Clear ${item.title}` : `Select ${item.title}`}
        className={`z-30 flex items-center justify-center rounded-full bg-[#4f6ef7] text-white shadow-xl !transition-transform hover:scale-105 hover:bg-[#4f6ef7] ${sizes[size]} ${className ?? ''}`}
      >
        {isSelected ? (
          <Check className={iconSizes[size]} />
        ) : (
          <MousePointer2 className={iconSizes[size]} />
        )}
      </button>
    </Boundary>
  );
}
