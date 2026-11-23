import { Heart, Home, Library, Search } from 'lucide-react';
import { MusicNote } from '@/components/ui/music-note';
import { AlbumArt } from '@/features/artwork/components/album-art';

const recentItems = [
  { subtitle: 'Core Guides', title: 'Async Patterns', tone: 'from-blue-500 to-indigo-600' },
  { subtitle: 'Core Guides', title: 'WebSocket Basics', tone: 'from-sky-400 to-blue-500' },
  { subtitle: 'Platform Docs', title: 'Server-Sent Events', tone: 'from-blue-400 to-cyan-500' },
  { subtitle: 'Platform Docs', title: 'Hydration Notes', tone: 'from-indigo-400 to-blue-500' },
  { subtitle: 'Internal Docs', title: 'Hot Module Reload', tone: 'from-sky-500 to-indigo-600' },
  { subtitle: 'Starter Kits', title: 'Localhost Morning', tone: 'from-blue-300 to-sky-500' },
];

const mostViewed = [
  { subtitle: 'Design Guides', title: 'Pixel Perfect Layout', tone: 'from-blue-400 to-indigo-500' },
  { subtitle: 'CLI Toolkit', title: 'Ship Checklist', tone: 'from-slate-500 to-blue-700' },
  { subtitle: 'Design Guides', title: 'Tailwind Patterns', tone: 'from-indigo-400 to-sky-500' },
  { subtitle: 'CLI Toolkit', title: 'Stack Trace Helper', tone: 'from-indigo-600 to-blue-800' },
  { subtitle: 'React Guides', title: 'Component Chemistry', tone: 'from-sky-400 to-cyan-500' },
  { subtitle: 'Internal Docs', title: 'Hot Module Reload', tone: 'from-sky-500 to-indigo-600' },
  { subtitle: 'Dev Utilities', title: '3 AM Push Guard', tone: 'from-blue-500 to-sky-600' },
  { subtitle: 'React Guides', title: 'Type Safe Forms', tone: 'from-blue-300 to-indigo-400' },
];

export function LoginBrandPreview() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden select-none">
      <div className="flex h-[calc(100%-8rem)] min-h-0 opacity-75 saturate-75 sm:h-[calc(100%-4.5rem)]">
        <aside className="hidden w-[4.5rem] shrink-0 flex-col gap-2 p-2 sm:flex lg:w-[17.5rem]">
          <div className="bg-card dark:bg-card-dark rounded-lg p-3 lg:p-4">
            <div className="text-accent mb-4 hidden items-center gap-2 px-1 text-xl font-bold tracking-tight lg:flex">
              <MusicNote size={24} />
              <span>NextBeats</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-3 rounded-md bg-white/10 p-2 text-sm font-bold lg:justify-start lg:px-3">
                <Home className="size-5" />
                <span className="hidden lg:inline">Home</span>
              </div>
              <div className="text-muted flex items-center justify-center gap-3 p-2 text-sm lg:justify-start lg:px-3">
                <Search className="size-5" />
                <span className="hidden lg:inline">Search</span>
              </div>
              <div className="text-muted flex items-center justify-center gap-3 p-2 text-sm lg:justify-start lg:px-3">
                <Library className="size-5" />
                <span className="hidden lg:inline">Library</span>
              </div>
            </div>
          </div>
          <div className="bg-card dark:bg-card-dark flex min-h-0 flex-1 flex-col rounded-lg p-3 lg:p-4">
            <div className="text-muted mb-3 flex items-center justify-center gap-2 text-sm font-bold lg:justify-start">
              <Library className="size-5" />
              <span className="hidden lg:inline">Your Library</span>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-3 rounded-md p-2 text-sm font-medium lg:justify-start">
                <Heart className="size-4" />
                <span className="hidden lg:inline">Favorites</span>
              </div>
              {[
                ['from-violet-500 to-purple-600', 'Late Night Coding'],
                ['from-purple-400 to-violet-500', 'Morning Focus'],
                ['from-fuchsia-500 to-purple-600', 'High Energy'],
              ].map(([tone, title]) => (
                <div
                  className="text-muted flex items-center justify-center gap-3 rounded-md p-2 text-sm lg:justify-start lg:px-3"
                  key={title}
                >
                  <span className={`size-3 shrink-0 rounded-sm bg-gradient-to-br ${tone}`} />
                  <span className="hidden truncate lg:inline">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="bg-surface dark:bg-surface-dark min-w-0 flex-1 overflow-hidden">
          <div className="px-6 py-6 sm:px-8">
            <div className="mb-6 flex items-center gap-3 sm:hidden">
              <MusicNote size={26} className="text-accent" />
              <span className="text-xl font-bold tracking-tight">NextBeats</span>
            </div>
            <h1 className="mb-6 text-3xl font-bold">Welcome back</h1>
            <h2 className="mb-4 text-xl font-bold">Recently Viewed</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {recentItems.map((item, index) => (
                <div
                  className="bg-card/60 dark:bg-card-dark/60 flex min-w-0 items-center gap-3 rounded-md px-3 py-2"
                  key={item.title}
                >
                  <span className="text-muted w-5 text-center text-xs tabular-nums">{index + 1}</span>
                  <AlbumArt coverColor={item.tone} size="sm" className="!size-10 !rounded-md" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{item.title}</span>
                    <span className="text-muted block truncate text-xs">{item.subtitle}</span>
                  </span>
                </div>
              ))}
            </div>

            <h2 className="mt-10 mb-4 text-xl font-bold">Most Viewed</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {mostViewed.map(item => (
                <div
                  className="bg-card/50 dark:bg-card-dark/50 flex min-w-0 flex-col gap-3 rounded-lg p-3"
                  key={item.title}
                >
                  <div className={`aspect-square w-full rounded-md bg-gradient-to-br shadow-lg ${item.tone}`} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{item.title}</span>
                    <span className="text-muted block truncate text-xs">{item.subtitle}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <div className="border-divider dark:border-divider-dark absolute inset-x-0 bottom-0 hidden h-[4.5rem] items-center border-t bg-white px-4 opacity-85 sm:flex dark:bg-[#181818]">
        <div className="flex min-w-0 items-center gap-3">
          <AlbumArt coverColor="from-blue-500 to-indigo-600" size="sm" className="!size-10 !rounded-sm lg:!size-14" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">Async Patterns</span>
            <span className="text-muted block truncate text-xs">Core Guides · Getting Started</span>
          </span>
        </div>
      </div>

      <div className="border-divider/70 dark:border-divider-dark/70 absolute inset-x-0 bottom-0 flex h-16 border-t bg-white sm:hidden dark:bg-[#181818]">
        {[
          [Home, 'Home'],
          [Search, 'Search'],
          [Library, 'Library'],
          [Heart, 'Favorites'],
        ].map(([Icon, label], index) => (
          <span
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${index === 0 ? 'text-accent font-bold' : 'text-muted'}`}
            key={label as string}
          >
            <Icon className="size-5" />
            {label as string}
          </span>
        ))}
      </div>
    </div>
  );
}
