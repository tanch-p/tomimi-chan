<script lang="ts">
	import stageList from '$lib/data/stages/is_stages_list.json';
	export let stageName: string, language: string;

	const update2Stages = ['互助', '饥渴', '瞻前顾后', '铳与秩序', '余烬方阵', '人之光辉'];

	const stageInfo = stageList.find((stage) => stage.name_zh === stageName);
	if (!stageInfo) {
		throw new Error(`${stageName} is not found!`);
	}
	$: stageUrl = stageInfo.code + '_' + (stageInfo[`name_${language}`] || stageInfo['name_zh']);

	$: hidden = language !== 'zh' && update2Stages.includes(stageName);

	$: name = stageInfo[`name_${language}`] || stageInfo['name_zh'];
</script>

<a href={`/${language}/stages/${stageUrl}`} class="hover:text-sky-400">
	<div
		class={`py-2 my-0.5 sm:my-1 text-center hover:backdrop-brightness-50 ${
			hidden ? 'opacity-0 hover:opacity-100' : ''
		}`}
	>
		{name.replaceAll('_', ' ')}
	</div>
</a>

<style>
</style>
