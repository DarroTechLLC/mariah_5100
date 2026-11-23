'use client';

import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/ui/error-state';

export default function CollectionError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorState title="Couldn't load this collection">
      <Button onClick={reset} size="sm" variant="secondary">
        Try again
      </Button>
    </ErrorState>
  );
}
