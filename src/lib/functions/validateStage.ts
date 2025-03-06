import ISStages from '$lib/data/stages/stage_name_lookup_table.json';

export default function validateStage(stageName: string, rogueTopic: string) {
	return stageName in ISStages && ISStages?.[stageName]?.topic === rogueTopic;
}
