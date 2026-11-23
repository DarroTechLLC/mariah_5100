'use client';

import { createContext, useContext, useState, useTransition } from 'react';
import { recordItemView } from '@/features/item/item-actions';
import type { Item } from '@/types/item';

export type SelectedItem = Pick<Item, 'id' | 'title' | 'subtitle' | 'coverColor'>;

type SelectionContextValue = {
  item: SelectedItem | null;
  select: (item: SelectedItem) => void;
  clear: () => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<SelectedItem | null>(null);
  const [, startTransition] = useTransition();

  function select(next: SelectedItem) {
    setItem(next);
    startTransition(() => {
      void recordItemView(next.id);
    });
  }

  function clear() {
    setItem(null);
  }

  return <SelectionContext.Provider value={{ clear, item, select }}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used within SelectionProvider');
  return ctx;
}
