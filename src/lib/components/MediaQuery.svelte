<script>
	import { onMount } from 'svelte';

	let layout = 'pc';
	onMount(() => {
		const mql = window.matchMedia('(max-width: 768px)');
		mql.addEventListener('change', screenTest);
		return () => {
			mql.removeEventListener('change', screenTest);
		};
	});

	function screenTest(e) {
		if (e.matches) {
			/* the viewport is 768 pixels wide or less */
			layout = 'mobile';
		} else {
			/* the viewport is more than 768 pixels wide */
			layout = 'pc';
		}
	}
</script>

{#if layout === 'mobile'}
	<slot name="mobile" />
{:else}
	<slot name="pc" />
{/if}
