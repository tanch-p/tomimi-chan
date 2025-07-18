import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 375, height: 844 }
});

test('sami difficulty + elite + chaos mods', async ({ page }) => {
	await page.goto('http://localhost:4173/en/stages/ISW-NO_Instinct_Contamination');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Instinct Contamination/);
	const diffIncreButton = await page.$('#diff-plus');
	await page.waitForTimeout(500);
	let hp = await page.$eval('#enemy_2046_smwar p[data-id="hp-value"]', (el) => el.textContent);
	expect(hp).toBe('20000');
	let atk = await page.$eval('#enemy_2046_smwar p[data-id="atk-value"]', (el) => el.textContent);
	expect(atk).toBe('700');
	await diffIncreButton?.click({ clickCount: 10 });
	await page.waitForTimeout(1500);
	let diff = await page.$eval('#diff-count', (el) => el.textContent);
	expect(diff).toBe('10');
	hp = await page.$eval('#enemy_2046_smwar p[data-id="hp-value"]', (el) => el.textContent);
	expect(hp).toBe('28102.7');
	atk = await page.$eval('#enemy_2046_smwar p[data-id="atk-value"]', (el) => el.textContent);
	expect(atk).toBe('1171');
	await diffIncreButton?.click({ clickCount: 5 });
	await page.waitForTimeout(1500);
	diff = await page.$eval('#diff-count', (el) => el.textContent);
	expect(diff).toBe('15');
	hp = await page.$eval('#enemy_2046_smwar p[data-id="hp-value"]', (el) => el.textContent);
	expect(hp).toBe('50408.2');
	atk = await page.$eval('#enemy_2046_smwar p[data-id="atk-value"]', (el) => el.textContent);
	expect(atk).toBe('1985');
	const eliteToggle = await page.$('#elite-toggle');
	await eliteToggle?.click();
	hp = await page.$eval('#enemy_2046_smwar p[data-id="hp-value"]', (el) => el.textContent);
	expect(hp).toBe('60489.8');
	atk = await page.$eval('#enemy_2046_smwar p[data-id="atk-value"]', (el) => el.textContent);
	expect(atk).toBe('2382');
});
