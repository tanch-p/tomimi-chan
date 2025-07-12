import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 375, height: 844 }
});

test('buffloss + elite mods', async ({ page }) => {
	await page.goto('http://localhost:4173/en/stages/ISW-NO_Rhine_Guardians');

	await expect(page).toHaveTitle(/Rhine Guardians/);
	const diffIncreButton = await page.$('#diff-plus');
	await diffIncreButton?.click({ clickCount: 18 });
	await page.waitForTimeout(1500);
	const diff = await page.$eval('#diff-count', (el) => el.textContent);
	expect(diff).toBe('18');
	let skillAtk = await page.$eval('#enemy_1332_cbterm_2-cbterm_explode', (el) =>
		el.textContent.replaceAll('(', '').replaceAll(')', '').trim()
	);
	expect(skillAtk).toBe('3000');

	const eliteToggle = await page.$('#elite-toggle');
	await eliteToggle?.dispatchEvent('click');
	skillAtk = await page.$eval('#enemy_1332_cbterm_2-cbterm_explode', (el) =>
		el.textContent.replaceAll('(', '').replaceAll(')', '').trim()
	);
	expect(skillAtk).toBe('3900');
});
