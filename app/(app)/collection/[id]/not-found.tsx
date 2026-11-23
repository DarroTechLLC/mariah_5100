import { FastLink } from '@fast-link/next';
import { ListMusic } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CollectionNotFound() {
  return (
    <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
      <ListMusic className="text-gray h-6 w-6" />
      <p className="text-sm font-medium text-black dark:text-white">Collection not found</p>
      <p className="text-gray max-w-xs text-sm">This collection doesn&apos;t exist or was deleted.</p>
      <FastLink href="/collection">
        <Button size="sm" variant="secondary">
          All collections
        </Button>
      </FastLink>
    </div>
  );
}
