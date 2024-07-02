import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 390, height: 844 }
});

test('mizuki difficulty mods', async ({ page }) => {
	await page.goto('http://localhost:4173/en/stages/ISW-DF_Destiny_of_We_Many');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Destiny_of_We_Many/);
	const diffIncreButton = await page.$('#diff-plus');

	let syskadHp = await page.$eval(
		'#enemy_2039_syskad p[data-id="hp-value"]',
		(el) => el.textContent
	);
	expect(syskadHp).toBe('90000');
	let syskadAtk = await page.$eval(
		'#enemy_2039_syskad p[data-id="atk-value"]',
		(el) => el.textContent
	);
	expect(syskadAtk).toBe('1600');
	await diffIncreButton?.click({ clickCount: 10 });
	await page.waitForTimeout(1500);
	let diff = await page.$eval('#diff-count', (el) => el.textContent);
	expect(diff).toBe('10');
	syskadHp = await page.$eval('#enemy_2039_syskad p[data-id="hp-value"]', (el) => el.textContent);
	expect(syskadHp).toBe('159440');
	syskadAtk = await page.$eval('#enemy_2039_syskad p[data-id="atk-value"]', (el) => el.textContent);
	expect(syskadAtk).toBe('3260');
	await diffIncreButton?.click({ clickCount: 5 });
	await page.waitForTimeout(1500);
	diff = await page.$eval('#diff-count', (el) => el.textContent);
	expect(diff).toBe('15');
	syskadHp = await page.$eval('#enemy_2039_syskad p[data-id="hp-value"]', (el) => el.textContent);
	expect(syskadHp).toBe('299773');
	syskadAtk = await page.$eval('#enemy_2039_syskad p[data-id="atk-value"]', (el) => el.textContent);
	expect(syskadAtk).toBe('5107');
	let syskadDef = await page.$eval(
		'#enemy_2039_syskad p[data-id="def-value"]',
		(el) => el.textContent
	);
	expect(syskadDef).toBe('1656');
	const oneAmongMany = await page.$('#One_Among_Many');
	await oneAmongMany?.dispatchEvent('click');
	syskadDef = await page.$eval('#enemy_2039_syskad p[data-id="def-value"]', (el) => el.textContent);
	expect(syskadDef).toBe('2484');
	const form2 = await page.$('#enemy_2039_syskad button[data-id="form-2"]');
	await form2?.click();
	syskadHp = await page.$eval('#enemy_2039_syskad p[data-id="hp-value"]', (el) => el.textContent);
	expect(syskadHp).toBe('149886');
	syskadAtk = await page.$eval('#enemy_2039_syskad p[data-id="atk-value"]', (el) => el.textContent);
	expect(syskadAtk).toBe('3192');
});
