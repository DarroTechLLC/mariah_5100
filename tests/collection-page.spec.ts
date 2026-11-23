import { instant } from '@next/playwright';
import { test, expect } from '@playwright/test';

test.describe('Collections page (/collection)', () => {
  test('initial page load shows the shell without the collection list', async ({ page }) => {
    await page.goto('/');

    await instant(page, async () => {
      await page.goto('/collection');
      await expect(page.locator('main a[href^="/collection/"]')).toHaveCount(0);
    });
  });

  test('client navigation shows the collection list resolved at prefetch time', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('aside a[href="/collection"]').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });

    await instant(page, async () => {
      await link.click();
      await page.waitForURL(url => url.pathname === '/collection');
      await expect(page.locator('main a[href^="/collection/"]').first()).toBeVisible();
    });
  });
});
