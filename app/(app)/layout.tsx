import { MobileTabBar } from '@/components/mobile-nav';
import { ActiveItemBar } from '@/components/active-item-bar';
import { SeedNavLinks } from '@/components/scripts/seed-nav-links';
import { Sidebar } from '@/components/sidebar';
import { OptimisticNavigationProvider } from '@/components/ui/nav-link';
import { SelectionProvider } from '@/providers/selection-provider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SelectionProvider>
      <OptimisticNavigationProvider>
        <div className="flex min-h-0 flex-1">
          <Sidebar />
          <main className="min-w-0 flex-1 overflow-hidden pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]">
            {children}
          </main>
        </div>
        <ActiveItemBar />
        <MobileTabBar />
        <SeedNavLinks />
      </OptimisticNavigationProvider>
    </SelectionProvider>
  );
}
