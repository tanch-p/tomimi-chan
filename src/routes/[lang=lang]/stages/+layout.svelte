<script lang="ts">
	import { page } from '$app/stores';

	$: language = $page.params.lang;
</script>

<div class={`layout ${language === 'zh' ? 'font-ch' : ''}`}>
	<slot />
</div>

<style>
	.font-ch {
		font-family: Noto Sans CJK SC, system-ui, -apple-system, BlinkMacSystemFont, Microsoft Yahei,
			SimSun, sans-serif;
	}
</style>
