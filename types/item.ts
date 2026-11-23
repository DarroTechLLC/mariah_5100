import type { Item as PrismaItem, UserFavorite, UserItemView } from '@/generated/prisma/client';

export type Item = {
  id: string;
  title: string;
  subtitle: string;
  group: string;
  duration: number;
  category: string;
  coverColor: string;
  viewCount: number;
  isFavorite: boolean;
  lastViewedAt: Date | null;
  createdAt: Date;
};

type UserData = {
  favorites?: UserFavorite[];
  itemViews?: UserItemView[];
};

export function toItem(row: PrismaItem, userData?: UserData): Item {
  return {
    category: row.category,
    coverColor: row.coverColor,
    createdAt: row.createdAt,
    duration: row.duration,
    group: row.group,
    id: row.id,
    isFavorite: userData?.favorites ? userData.favorites.length > 0 : false,
    lastViewedAt: userData?.itemViews?.[0]?.lastViewedAt ?? null,
    subtitle: row.subtitle,
    title: row.title,
    viewCount: row.viewCount,
  };
}
