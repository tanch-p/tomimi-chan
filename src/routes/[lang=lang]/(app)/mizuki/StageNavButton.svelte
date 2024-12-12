<script lang="ts">
	import type { Language } from '$lib/types';
	import stageList from '$lib/data/stages/is_stages_list.json';
	import { page } from '$app/stores';

	export let stageName: string, language: Language;

	$: currentStageName = $page?.data?.mapConfig?.name_zh;

	const stageInfo = stageList.find((stage) => stage.name_zh === stageName);
	if (!stageInfo) {
		throw new Error(`${stageName} is not found!`);
	}
	$: stageUrl = stageInfo.code + '_' + (stageInfo[`name_${language}`] || stageInfo['name_zh']);

	$: name = stageInfo[`name_${language}`] || stageInfo['name_zh'];
</script>

<a
	data-sveltekit-preload-code="eager"
	href={`/${language}/stages/${stageUrl}`}
	class="hover:text-sky-400"
>
	<div
		class:backdrop-brightness-50={stageName === currentStageName}
		class={`py-2 my-0.5 sm:my-1 text-center hover:backdrop-brightness-50`}
	>
		{name.replaceAll('_', ' ')}
	</div>
</a>
