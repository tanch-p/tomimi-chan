import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 375, height: 844 }
});

test('sami difficulty + elite + portal mods', async ({ page }) => {
	await page.goto('http://localhost:4173/en/stages/ISW-NO_Rational_Fracture');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Rational_Fracture/);
	const diffIncreButton = await page.$('#diff-plus');
	await page.waitForTimeout(500);
	let def = await page.$eval('#enemy_2046_smwar p[data-id="def-value"]', (el) => el.textContent);
	expect(def).toBe('800');
	let res = await page.$eval('#enemy_2046_smwar p[data-id="res-value"]', (el) => el.textContent);
	expect(res).toBe('20');
	await diffIncreButton?.click({ clickCount: 15 });
	await page.waitForTimeout(1500);
	const diff = await page.$eval('#diff-count', (el) => el.textContent);
	expect(diff).toBe('15');
	def = await page.$eval('#enemy_2046_smwar p[data-id="def-value"]', (el) => el.textContent);
	expect(def).toBe('1000');
	res = await page.$eval('#enemy_2046_smwar p[data-id="res-value"]', (el) => el.textContent);
	expect(res).toBe('20');
	const eliteToggle = await page.$('#elite-toggle');
	await eliteToggle?.click();
	def = await page.$eval('#enemy_2046_smwar p[data-id="def-value"]', (el) => el.textContent);
	expect(def).toBe('1150');
	res = await page.$eval('#enemy_2046_smwar p[data-id="res-value"]', (el) => el.textContent);
	expect(res).toBe('20');
	const floorOptions = await page.$('#floor-options');
	await floorOptions?.click();
	const samiPortal = await page.$('#sami-portal');
	await samiPortal?.click();
	def = await page.$eval('#enemy_2046_smwar p[data-id="def-value"]', (el) => el.textContent);
	expect(def).toBe('2150');
	res = await page.$eval('#enemy_2046_smwar p[data-id="res-value"]', (el) => el.textContent);
	expect(res).toBe('50');
});
