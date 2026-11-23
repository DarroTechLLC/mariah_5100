import { cn } from '@/lib/utils';
import { AlbumArtCover } from './album-art-cover';
import type { ArtworkKind } from '@/features/artwork/artwork-motif';

type Props = {
  coverColor: string;
  coverSeed?: string;
  label?: string;
  kind?: ArtworkKind;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeMap = {
  lg: 'h-24 w-24',
  md: 'h-12 w-12',
  sm: 'h-10 w-10',
};

export function AlbumArt({
  coverColor,
  coverSeed,
  label,
  kind = 'item',
  size = 'md',
  className,
}: Props) {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-md bg-gradient-to-br',
        coverColor,
        sizeMap[size],
        className,
      )}
    >
      {coverSeed && (
        <AlbumArtCover seed={coverSeed} label={label ?? coverSeed} kind={kind} small={size !== 'lg'} />
      )}
    </div>
  );
}

export function AlbumArtSkeleton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return <span aria-hidden className={cn('skeleton-animation block rounded-md', sizeMap[size])} />;
}
