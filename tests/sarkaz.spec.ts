import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 375, height: 844 }
});

test('sarkaz difficulty + elite + relic + epoch on hp/hit mob', async ({ page }) => {
	await page.goto('http://localhost:4173/en/stages/ISW-NO_Heavenly_Paradise');

	await expect(page).toHaveTitle(/Heavenly Paradise/);
	const diffIncreButton = await page.$('#diff-plus');
	await page.waitForTimeout(500);

	// low_diff
	let hp = await page.$eval('#enemy_1208_msfji_2 p[data-id="hp-value"]', (el) => el.textContent);
	expect(hp).toBe('24');

	await diffIncreButton?.click({ clickCount: 18 });
	await page.waitForTimeout(1500);
	const diff = await page.$eval('#diff-count', (el) => el.textContent);
	expect(diff).toBe('18');

	hp = await page.$eval('#enemy_1208_msfji_2 p[data-id="hp-value"]', (el) => el.textContent);
	expect(hp).toBe('30');

	const eliteToggle = await page.$('#elite-toggle');
	await eliteToggle?.dispatchEvent('click');
	hp = await page.$eval('#enemy_1208_msfji_2 p[data-id="hp-value"]', (el) => el.textContent);
	expect(hp).toBe('60');

	const disaster = await page.$('#rogue_4_disaster_5');
	await disaster?.dispatchEvent('click');
	hp = await page.$eval('#enemy_1208_msfji_2 p[data-id="hp-value"]', (el) => el.textContent);
	expect(hp).toBe('90');
});
