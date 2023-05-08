<script lang="ts">
	import stageList from '$lib/data/stages/is_stages_list.json';
	export let stageName: string, language: string;

	const stageInfo = stageList.find((stage) => stage.name_zh === stageName);
	if (!stageInfo) {
		throw new Error(`${stageName} is not found!`);
	}
	const stageUrl = stageInfo.code + '_' + (stageInfo[`name_${language}`] || stageInfo['name_zh']);
</script>

<a href={`/${language}/stages/${stageUrl}`} class="hover:text-sky-400">
	<div class={`py-2 md:my-1 text-center hover:backdrop-brightness-50`}>
		{stageName}
	</div>
</a>

<style>
</style>
