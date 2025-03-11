<script>
	import Icons from '$lib/components/Icons.svelte';
	import ScrollButtons from '$lib/components/ScrollButtons.svelte';
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser, dev } from '$app/environment';

	// Global error handler for client-side errors
	function handleGlobalError(event) {
		if (dev) return;
		console.error('Global error caught:', event.error);
		const errorData = {
			message: event.message || 'Unknown error',
			stack: event.error.stack,
			url: event.filename,
			otherInfo: `lineNo: ${event.lineno}, colNo: ${event.colno}`,
			side:"CLIENT"
		};
		// Send the error to the server
		fetch('/api/errors/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				errorData
			})
		});
		// Prevent default logging
		event.preventDefault();
	}

	// Attach global error listener
	onMount(() => {
		if (browser) {
			window.addEventListener('error', handleGlobalError);
			window.addEventListener('unhandledrejection', (event) => {
				handleGlobalError({ error: event.reason });
			});
		}
	});
</script>

<ScrollButtons hasBtm={$page?.data?.mapConfig} />

<Icons />
<slot />
