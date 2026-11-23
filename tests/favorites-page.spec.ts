import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Favorites page (/favorites)', () => {
  test('initial page load shows the shell without favorites', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/favorites');
      await expect(page.locator('main a[href^="/item/"]')).toHaveCount(0);
    });
  });

  test('client navigation shows the favorites resolved at prefetch time', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[aria-label="Favorites"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await page.waitForURL(url => url.pathname === '/favorites');
      await expect(page.locator('main a[href^="/item/"]').first()).toBeVisible();
    });
  });
});
