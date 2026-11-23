# NextBeats / app template — agent awareness

This repo is a **Next.js Instant Navigation app shell**. Agents coding here must follow these docs and stack choices. Do not invent alternate navigation, caching, or data-store patterns.

## Canonical docs (read before changing routing, caching, or data)

| Topic | URL |
|-------|-----|
| Next.js App Router docs (root) | https://nextjs.org/docs |
| Instant Navigation guide | https://preview.nextjs.org/docs/app/guides/instant-navigation |
| PostgreSQL | https://www.postgresql.org/ |
| Prisma docs (ORM in this app) | https://www.prisma.io/docs |
| Also read local Next docs when present | `node_modules/next/dist/docs/` (this Next version can differ from training data) |

Stable Instant Navigation mirror (same topic): https://nextjs.org/docs/app/guides/instant-navigation

## How we do Next.js in this repo

1. **Instant Navigation is the product contract.** Navigations should paint the App Shell (static + cached + Suspense fallbacks) immediately; uncached work streams in after click.
2. Keep **`cacheComponents: true`** and **`partialPrefetching: true`** in `next.config.ts`. Do not disable them to “fix” a page.
3. Prefer **`"use cache"` + `cacheTag` / `cacheLife`** for read paths. Mutations use Server Functions and invalidate with **`updateTag`** (not broad full-route busting unless required).
4. Place **`Suspense`** below the shared layout so client navigations can show fallbacks. A root-only Suspense does not cover client transitions into a shared layout.
5. Links: shared App Shell prefetch by default; use **`prefetch={true}`** (and hover/focus prefetch for long lists) when URL-specific cached content should be warm before click. Prefer existing `NavLink` / `FastLink` / prefetch helpers over new ad-hoc link wrappers.
6. Use **View Transitions** and React async patterns already in the tree (`useOptimistic`, `useTransition`, `use`, etc.). React Compiler is on — do not add manual `useMemo` / `useCallback` unless there is a measured need.
7. Lock Instant Navigation with **Playwright + `@next/playwright` `instant()`** when changing route shells (see `tests/` and the Instant Navigation guide’s testing section).

## Data store

- **PostgreSQL is required** for the real template path (`DATABASE_URL`).
- **Prisma** is the ORM; keep `provider = "postgresql"` unless the user explicitly asks for a local SQLite swap. Do not swap to another ORM without an explicit user request.
- Official references: https://www.postgresql.org/ · https://www.prisma.io/docs

## Docs MCP protocol

When an agent needs official product docs over MCP, add the docs server then verify:

```bash
codex mcp add --url <docs-mcp-url> <name>
codex mcp list
```

Prefer bound docs MCPs over scraping or guessing API shapes. For Next.js Instant Navigation and Postgres, use the canonical URLs above (and local `node_modules/next/dist/docs/`) unless a dedicated docs MCP is configured.
## Template intent

NextBeats is an Instant Navigation **app shell** (catalog/items/collections domain, not a music player). The **template** direction is:

- Keep: app chrome (sidebar, mobile nav, layout), Instant Nav / cache / prefetch / Server Function patterns, login, search, list→detail, favorites, collections, Postgres, selection bar.
- Domain: Item / Collection / Category — not tracks, audio engines, or playback.
- Expectation: agents build product features on this shell without ripping out Instant Navigation.

See also: root `README.md`, `AGENTS.md`, and `next.config.ts`.
