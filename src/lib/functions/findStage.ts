import stagesList from '$lib/data/stages/is_stages_list.json' assert { type: 'json' };

export default function findStage(stageName: string) {
	return stagesList.find((stage) => {
		const { code, name_zh, name_ja, name_en } = stage;
		const possibleStageNames = [code + '_' + name_zh, code + '_' + name_ja, code + '_' + name_en];
		return possibleStageNames.includes(stageName);
	});
}
