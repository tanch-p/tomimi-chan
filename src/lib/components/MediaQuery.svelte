<script lang="ts">
	import { onMount } from 'svelte';

	let layout;
	onMount(() => {
		const mql = window.matchMedia('(max-width: 768px)');
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
