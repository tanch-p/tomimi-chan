import stagesList from '$lib/data/stages/is_stages_list.json' assert { type: 'json' };

export default function findStage(stageName: string, rogueTopic: string) {
	return stagesList
		.filter((stage) => stage.tags.includes(rogueTopic))
		.find((stage) => {
			const { code, name_zh, name_ja, name_en } = stage;
			if(name_zh === "「」"){
				return stageName === "ro4_b_9";
			}
			const possibleStageNames = [code + '_' + name_zh, code + '_' + name_ja, code + '_' + name_en];
			return possibleStageNames.includes(stageName);
		});
}