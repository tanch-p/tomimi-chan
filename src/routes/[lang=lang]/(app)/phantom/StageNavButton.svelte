<script lang="ts">
	import stageList from '$lib/data/stages/is_stages_list.json';
	export let stageName: string, language: string;

	const stageInfo = stageList.find((stage) => stage.name_zh === stageName);
	if (!stageInfo) {
		throw new Error(`${stageName} is not found!`);
	}
	$: name = stageInfo[`name_${language}`] || stageInfo['name_zh'];
	$: stageUrl = stageInfo.code + '_' + name;
</script>

<a data-sveltekit-preload-code="viewport" href={`/${language}/stages/${stageUrl}`}>
	<div class={`hover:text-sky-400 hover:bg-[#343434] py-1.5 px-1 md:h-full hover:cursor-pointer`}>
		{name.replaceAll('_', ' ')}
	</div>
</a>

<style>
</style>
