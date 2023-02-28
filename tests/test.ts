import { expect, test } from '@playwright/test';

test('about page has expected h1', async ({ page }) => {
	await page.goto('/about');
	await expect(page.locator('h1')).toHaveText('About this app');
});

/* test cases to write 
1. nav to homepage - check if language is applied automatically
2. nav to stages using mizuki nav
3. unit tests for stats
4. nav between stages to ensure hardmods is properly resetted on destroy
*/