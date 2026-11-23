'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { ArtworkKind } from '@/features/artwork/artwork-motif';
import { coverAsset } from '@/features/artwork/cover-assets';

type Props = {
  seed: string;
  label: string;
  kind: ArtworkKind;
  small?: boolean;
};

export function AlbumArtCover({ seed, label, kind, small = false }: Props) {
  const staticShape = kind === 'category' ? (small ? 'banner-thumb' : 'banner') : small ? 'thumb' : 'square';
  const staticAsset = coverAsset(seed, label, kind, staticShape);

  return (
    <>
      {!small && <LiveAlbumArt seed={seed} label={label} kind={kind} />}
      <AlbumArtFallback kind={kind} asset={staticAsset} />
    </>
  );
}

function LiveAlbumArt({ seed, label, kind }: Omit<Props, 'small'>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let unmount: (() => void) | undefined;
    let cancelled = false;

    void import('@/features/artwork/artwork-runtime')
      .then(({ mountLiveAlbumArt }) => {
        if (cancelled) return;
        unmount = mountLiveAlbumArt({
          canvas,
          kind,
          label,
          seed,
        });
      })
      .catch(() => {
        // The pre-rendered artwork remains visible if the live runtime cannot load.
      });

    return () => {
      cancelled = true;
      unmount?.();
    };
  }, [kind, label, seed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="album-art-shader pointer-events-none absolute inset-0 z-20 block h-full w-full"
    />
  );
}

function AlbumArtFallback({ kind, asset }: { kind: ArtworkKind; asset: ReturnType<typeof coverAsset> }) {
  return kind === 'category' ? (
    <Image
      alt=""
      decoding="sync"
      width={asset.width}
      height={asset.height}
      loading="eager"
      src={asset.src}
      unoptimized
      className="album-art-fallback pointer-events-none absolute top-0 left-1/2 z-10 block h-full w-auto max-w-none -translate-x-1/2"
    />
  ) : (
    <Image
      alt=""
      decoding="sync"
      fill
      loading="eager"
      sizes={asset.sizes}
      src={asset.src}
      unoptimized
      className="album-art-fallback pointer-events-none absolute inset-0 z-10 block object-cover"
    />
  );
}
