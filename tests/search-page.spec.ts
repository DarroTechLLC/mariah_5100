import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Search page (/search)', () => {
  test('initial page load shows the search shell without the browse grid', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/search');
      await expect(page.locator('input[aria-label="Search items"]')).toBeVisible();
      await expect(page.locator('main a[href^="/category/"]')).toHaveCount(0);
    });
  });

  test('client navigation shows the browse grid resolved at prefetch time', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[aria-label="Search"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await page.waitForURL(url => url.pathname === '/search');
      await expect(page.locator('main a[href^="/category/"]').first()).toBeVisible();
    });
  });

  // Typing drives a router.replace per keystroke; the input must keep focus so every character lands.
  test('search keeps focus across soft navigations', async ({ page }) => {
    await page.goto('/search');
    const search = page.getByRole('searchbox', { name: 'Search items' });
    await search.waitFor({ state: 'visible', timeout: 15000 });
    await search.click();
    await page.keyboard.type('async', { delay: 150 });
    await expect(search).toBeFocused();
    await expect(search).toHaveValue('async');
  });
});
