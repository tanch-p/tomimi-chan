<script lang="ts">
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	let layout;
	onMount(() => {
		const mql = dev
			? window.matchMedia('(max-width:768px)')
			: window.matchMedia('(pointer: coarse)');
		layout = mql.matches ? 'mobile' : 'pc';
		mql.addEventListener('change', screenTest);
		return () => {
			mql.removeEventListener('change', screenTest);
		};
	});

	function screenTest(e: MediaQueryListEvent) {
		//matches: Boolean
		layout = e.matches ? 'mobile' : 'pc';
	}
</script>

{#if layout === 'mobile'}
	<slot name="mobile" />
{:else if layout === 'pc'}
	<slot name="pc" />
{:else}
	<div class="min-h-screen" />
{/if}
