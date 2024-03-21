<script lang="ts">
	import type { Language } from '$lib/types';
	import stageList from '$lib/data/stages/is_stages_list.json';
	export let stageName: string, language: Language;

	const stageInfo = stageList.find((stage) => stage.name_zh === stageName);
	if (!stageInfo) {
		throw new Error(`${stageName} is not found!`);
	}
	const stagesToHide = [
		'事不过四',
		'还之彼身',
		'恃强凌弱',
		'冰凝之所',
		'人造物狂欢节',
		'深寒造像',
		'虚无之偶',
		'时光之沙',
		'哨兵',
		'迈入永恒',
		'黄沙幻境',
		'亘古仇敌'
	];
	$: name = stageInfo[`name_${language}`] || stageInfo['name_zh'];
	$: stageUrl = stageInfo.code + '_' + name;
</script>

<a data-sveltekit-preload-code="eager" href={`/${language}/stages/${stageUrl}`}>
	<div
		class={`hover:text-sky-400 hover:bg-[#343434] py-1.5 px-1 md:h-full hover:cursor-pointer ${
			language !== "zh" && stagesToHide.includes(stageName) ? 'text-neutral-800' : ''
		}`}
	>
		{name.replaceAll('_', ' ')}
	</div>
</a>

<style>
</style>
