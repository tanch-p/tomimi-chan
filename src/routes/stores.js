import { browser } from '$app/environment';

export let cookiesEnabled = true;
if (browser) {
	try {
		localStorage.getItem('language');
	} catch {
		cookiesEnabled = false;
	}
}