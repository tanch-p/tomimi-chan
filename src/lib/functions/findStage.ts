import stagesList from '$lib/data/stages/is_stages_list.json' assert { type: 'json' };
import ccStages from '$lib/data/stages/cc_stages_list.json' assert { type: 'json' };

export default function findStage(stageName: string, rogueTopic: string) {
	return stagesList
		.filter((stage) => stage.tags.includes(rogueTopic))
		.find((stage) => {
			const { code, name_zh, name_ja, name_en } = stage;
			const possibleStageNames = [code + '_' + name_zh, code + '_' + name_ja, code + '_' + name_en];
			return possibleStageNames.includes(stageName);
		});
}

export function findCCStage(stageName: string) {
	return ccStages.find((stage) => {
		const { name_zh, name_ja, name_en } = stage;
		const possibleStageNames = [name_zh, name_ja, name_en];
		return possibleStageNames.includes(stageName);
	});
}
