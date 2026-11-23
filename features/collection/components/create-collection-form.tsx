'use client';

import { toast } from 'sonner';
import { Boundary } from '@/components/demo/boundary';
import { Button } from '@/components/ui/button';
import { createCollection } from '@/features/collection/collection-actions';

export function CreateCollectionForm() {
  async function createCollectionAction(formData: FormData) {
    const result = await createCollection(formData);
    if (result.ok) {
      toast.success('Collection created');
    } else {
      toast.error(result.error);
    }
  }

  return (
    <Boundary label="CreateCollectionForm">
      <form action={createCollectionAction} className="flex gap-2">
        <input
          name="name"
          placeholder="New collection name…"
          required
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-form-type="other"
          className="flex-1"
          onKeyDown={e => {
            if (e.key === 'Enter' && e.metaKey) {
              e.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <Button type="submit" size="sm">
          Create
        </Button>
      </form>
    </Boundary>
  );
}
