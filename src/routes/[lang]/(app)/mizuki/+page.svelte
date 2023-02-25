<script lang="ts">
	import MizukiNav from './MizukiNav.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const {language} = data;
</script>

<MizukiNav {language} />
