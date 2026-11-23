import { artworkVariant, seedVector } from './artwork-motif';
import { COVER_ASSET_VERSION } from './generated-cover-version';
import type { ArtworkKind } from './artwork-motif';

export const COVER_SHAPES = [
  { detail: 1, height: 512, name: 'square', width: 512 },
  { detail: 1.08, height: 80, name: 'thumb', width: 80 },
  { detail: 1, height: 288, name: 'banner', width: 960 },
  { detail: 1.08, height: 96, name: 'banner-thumb', width: 320 },
] as const;

export type CoverShape = (typeof COVER_SHAPES)[number]['name'];

type CollectionCoverSource = {
  id: string;
  name: string;
  items: readonly { id: string; title: string }[];
};

function assetKey(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-|-$/g, '') || 'cover'
  );
}

export function coverAssetPath(seed: string, label: string, kind: ArtworkKind, shape: CoverShape) {
  // Keep using the bundled static cover folders; new category names fall back to CSS gradients.
  if (kind === 'category') return `/covers/genres/${assetKey(label)}-${shape}.static.webp`;
  if (kind === 'collection') {
    const variant = artworkVariant(label, kind, seedVector(seed)[3]);
    return `/covers/playlists/${variant}-${shape}.static.webp`;
  }
  return `/covers/tracks/${assetKey(seed)}-${shape}.static.webp`;
}

export function coverAsset(seed: string, label: string, kind: ArtworkKind, shape: CoverShape) {
  const dimensions = COVER_SHAPES.find(candidate => candidate.name === shape)!;
  const sizes = shape === 'square' ? '512px' : shape === 'thumb' ? '80px' : `${dimensions.width}px`;
  const path = coverAssetPath(seed, label, kind, shape);
  return {
    height: dimensions.height,
    sizes,
    src: `${path}?v=${COVER_ASSET_VERSION}`,
    width: dimensions.width,
  };
}

export function collectionCoverPreloads(collection: CollectionCoverSource) {
  return [
    coverAsset(collection.id, collection.name, 'collection', 'square'),
    ...collection.items.map(item => coverAsset(item.id, item.title, 'item', 'thumb')),
  ];
}
