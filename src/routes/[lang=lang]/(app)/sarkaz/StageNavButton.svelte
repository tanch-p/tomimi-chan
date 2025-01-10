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
	const stagesToHide = [
		'冰川期',
		'丛林密布',
		'机动队',
		'争议频发',
		'莱茵卫士',
		'不容拒绝',
		"「」",
		'卡兹瀑布',
		'火力小队',
		'神出鬼没',
		'混沌',
		'建制',
		'思维矫正',
		'魂灵朝谒',
		'授法',
		'轻舟共渡'
	];
	$: name = stageInfo[`name_${language}`] || stageInfo['name_zh'];
	$: stageUrl = name==="「」" ? "ro4_b_9" :stageInfo.code + '_' + name;
</script>

<a data-sveltekit-preload-code="eager" href={`/${language}/stages/${stageUrl}`}>
	<div
		class:active={stageName === currentStageName}
		class={`hover:text-sky-400 hover:bg-[#343434] py-1.5 px-1 md:h-full hover:cursor-pointer ${
			language !== 'zh' && stagesToHide.includes(stageName) ? 'text-neutral-800' : ''
		}`}
	>
		{name.replaceAll('_', ' ')}
	</div>
</a>

<style>
	div.active {
		background-color: #4e4c49;
		color: #38bdf8;
	}
</style>
