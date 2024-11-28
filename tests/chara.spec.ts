import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 375, height: 844 }
});

test('chara selector is not crashing', async ({ page }) => {
	await page.goto('http://localhost:4173/en/recruit');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Operator Recruit Helper/);
	await page.waitForTimeout(500);
	const enemyDebuffBtn = await page.$('#enemy_debuff');
	await enemyDebuffBtn?.click({ clickCount: 1 });
	await page.waitForTimeout(500);

	const msDownBtn = await page.$('#ms_down');
	await msDownBtn?.click({ clickCount: 1 });
	await page.waitForTimeout(500);

	const secSluggishBtn = await page.$('#sec-sluggish');
	await secSluggishBtn?.click({ clickCount: 1 });
	await page.waitForTimeout(500);

	await expect(page.locator('#sec-sluggish')).toHaveClass("filter-btn active")
});
