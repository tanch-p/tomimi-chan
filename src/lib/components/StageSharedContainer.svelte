<script lang="ts">
	import type { RogueTopic } from '$lib/types';
	import { getOtherBuffsList, pruneExtraEnemies } from '$lib/functions/lib';
	import { applyMods } from '$lib/functions/statHelpers';
	import { applyTrapMods, filterTraps } from '$lib/functions/trapHelpers';
	import { onDestroy, setContext } from 'svelte';
	import EliteToggle from './EliteToggle.svelte';
	import EnemyCount from './EnemyCount.svelte';
	import EnemyStatDisplay from './EnemyStatDisplay.svelte';
	import ModsCheck from './ModsCheck.svelte';
	import { GameConfig } from './StageSimulator/objects/GameConfig';
	import TrapContainer from './TrapContainer.svelte';
	import { eliteMode, otherBuffsList, mapConfig as mapConfigStore } from '$lib/global_stores';

	export let language,
		mapConfig,
		traps,
		enemies,
		statMods,
		specialMods,
		rogueTopic: RogueTopic | null = null,
		selectedRelics = null,
		difficulty = 0;

	$: moddedEnemies = applyMods(enemies, $statMods, $specialMods);
	$: moddedTraps = applyTrapMods(traps, $statMods, $specialMods);
	eliteMode.subscribe((v) => (GameConfig.eliteMode = v));
	specialMods.subscribe((v) => {
		GameConfig.specialMods = v;
	});

	$: if (mapConfig) {
		mapConfigStore.set(mapConfig);
	}

	$: otherBuffsList.set(
		getOtherBuffsList(rogueTopic, enemies, mapConfig, language, difficulty, $specialMods)
	);
	setContext('statMods', statMods);
	setContext('specialMods', specialMods);

	onDestroy(() => {
		eliteMode.set(false);
	});

	const promise = import('./StageSimContainer.svelte').then(({ default: C }) => C);
</script>

{#await promise then StageSimContainer}
	<StageSimContainer
		{mapConfig}
		enemies={moddedEnemies}
		{language}
		eliteMode={$eliteMode}
		{rogueTopic}
		{difficulty}
	>
		<EliteToggle
			slot="eliteMods"
			inWaveOptions={true}
			{rogueTopic}
			{selectedRelics}
			stageId={mapConfig.levelId}
		/>
	</StageSimContainer>
{/await}
<TrapContainer
	{language}
	traps={filterTraps(moddedTraps)}
	{otherBuffsList}
	specialMods={$specialMods}
	{mapConfig}
/>
<ModsCheck {language} enemies={moddedEnemies} {mapConfig} />
<EnemyCount
	{mapConfig}
	enemies={pruneExtraEnemies(moddedEnemies, mapConfig.levelId)}
	eliteMode={$eliteMode}
	{language}
	{rogueTopic}
/>
<div class="sm:px-6">
	<EliteToggle {rogueTopic} {selectedRelics} stageId={mapConfig.levelId} />
	<EnemyStatDisplay enemies={pruneExtraEnemies(moddedEnemies, mapConfig.levelId)} {language} />
	<div id="stageNav" class="mt-8 sm:mt-16 scroll-mt-20">
		<slot name="nav" />
	</div>
</div>
