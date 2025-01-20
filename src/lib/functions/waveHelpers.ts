export const getWaveData = (rogueTopic, levelId) => {
	const folder =
		rogueTopic === 'rogue_skz'
			? 'ro4'
			: rogueTopic === 'rogue_sami'
			? 'ro3'
			: rogueTopic === 'rogue_mzk'
			? 'ro2'
			: 'ro1';
	const promise = fetch(`/wave_data/${folder}/${levelId}.json`)
	return promise;
};
