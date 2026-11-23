import type { Item } from '@/types/item';

export type CollectionSummary = {
  id: string;
  name: string;
  description: string;
  coverColor: string;
  itemCount: number;
};

export type CollectionWithItems = CollectionSummary & {
  items: Item[];
};

export type CollectionMenuItem = {
  label: string;
  value: string;
  active: boolean;
};
