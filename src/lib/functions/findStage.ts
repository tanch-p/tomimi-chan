import stagesList from '$lib/data/stages/is_stages_list.json';

export default function findStage(stageName: string) {
	return stagesList.find((stage) => {
		const { code, name_cn, name_jp, name_en } = stage;
		const possibleStageNames = [code + '_' + name_cn, code + '_' + name_jp, code + '_' + name_en];
		return possibleStageNames.includes(stageName);
	});
}
