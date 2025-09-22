import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 375, height: 844 }
});

test('make sure elite toggle appears', async ({ page }) => {
	await page.goto("http://localhost:4173/en/stages/ISW-DF_Fate's_Finale");

	await expect(page).toHaveTitle(/Fate's Finale/);
	await page.waitForTimeout(500);
	const eliteToggle = await page.$('#elite-toggle');
	
	expect(Boolean(eliteToggle)).toBe(true)
});
