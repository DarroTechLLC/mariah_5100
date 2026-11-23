'use client';

// Per Next.js "Preventing flash before hydration": client-rendered scripts
// never execute, so use text/plain on the client to silence the React warning
// while keeping text/javascript in the SSR HTML so the browser runs it on parse.
// https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
