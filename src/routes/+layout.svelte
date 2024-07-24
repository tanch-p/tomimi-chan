<script>
	import Icons from '$lib/components/Icons.svelte';
	import ScrollButtons from '$lib/components/ScrollButtons.svelte';
	import '../app.css';
	import { page } from '$app/stores';
</script>

<ScrollButtons hasBtm={$page?.data?.mapConfig}/>

<Icons />
<slot />
