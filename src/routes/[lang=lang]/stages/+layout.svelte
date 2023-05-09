<script lang="ts">
	import { page } from '$app/stores';

	$: language = $page.params.lang;
</script>

<div class={`layout ${language === 'zh' ? 'font-ch' : ''}`}>
	<slot />
</div>

<style>
	.font-ch {
		font-family: Noto Sans CJK SC, sans-serif, Microsoft Yahei, SimSun;
	}
</style>
