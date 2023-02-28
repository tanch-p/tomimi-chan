<script lang="ts">
	import stageList from '$lib/data/stages/is_stages_list.json';
	export let stageName:string, language:string;

	const stageInfo = stageList.find((stage) => stage.name_zh === stageName);
	if (!stageInfo) {
		throw new Error(`${stageName} is not found!`);
	}
	const stageUrl = stageInfo.code + '_' + (stageInfo[`name_${language}`] || stageInfo['name_zh']);
	let languageStyles = {
		jp: 'whitespace-nowrap py-2 w-[120px]',
		en: 'text-sm w-[100px] py-1',
		cn: 'text-base w-[100px]'
	};
</script>

<a href={`/${language}/stages/${stageUrl}`}>
	<div class={`hover:text-sky-400  md:h-full mx-2 my-3 md:my-1 text-center hover:cursor-pointer`}>
		{stageName}
	</div>
</a>
