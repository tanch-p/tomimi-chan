<script lang="ts">
	import stageList from '$lib/data/stages/is_stages_list.json';
	export let stageName: string, language: string;

	const stageInfo = stageList.find((stage) => stage.name_zh === stageName);
	if (!stageInfo) {
		throw new Error(`${stageName} is not found!`);
	}
	const stageUrl = stageInfo.code + '_' + (stageInfo[`name_${language}`] || stageInfo['name_zh']);
	let languageStyles = {
		ja: 'whitespace-nowrap py-2 w-[120px]',
		en: 'text-sm w-[100px] py-1',
		cn: 'text-base w-[100px]'
	};
</script>

<a href={`/${language}/stages/${stageUrl}`}>
	<div class={`hover:text-sky-400 py-1.5 md:h-full hover:cursor-pointer`}>
		{stageName}
	</div>
</a>

<style>
</style>
