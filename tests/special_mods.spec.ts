import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 375, height: 844 }
});

test('special mods + form mods changes', async ({ page }) => {
	await page.goto('http://localhost:4173/en/stages/ISW-NO_Passage_Blockade');
	await expect(page).toHaveTitle(/Passage Blockade/);
	await page.waitForTimeout(500);
	
	let atk = await page.$eval('#enemy_1513_dekght p[data-id="atk-value"]', (el) => el.textContent);
	expect(atk).toBe('1400');

	const form2Button = await page.$('[data-id="form-2"]');
	await form2Button?.dispatchEvent('click');
	atk = await page.$eval('#enemy_1513_dekght p[data-id="atk-value"]', (el) => el.textContent);
	expect(atk).toBe('2520');

	const eliteToggle = await page.$('#elite-toggle');
	await eliteToggle?.dispatchEvent('click');
	atk = await page.$eval('#enemy_1513_dekght p[data-id="atk-value"]', (el) => el.textContent);
	expect(atk).toBe('3864');
});
