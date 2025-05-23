<script lang="ts">
	import { pruneExtraEnemies } from '$lib/functions/lib';
	import { applyMods, compileStatModsForChecking } from '$lib/functions/statHelpers';
	import { applyTrapMods, filterTraps } from '$lib/functions/trapHelpers';
	import EliteToggle from './EliteToggle.svelte';
	import EnemyCount from './EnemyCount.svelte';
	import EnemyStatDisplay from './EnemyStatDisplay.svelte';
	import ModsCheck from './ModsCheck.svelte';
	import { GameConfig } from './StageSimulator/objects/GameConfig';
	import TrapContainer from './TrapContainer.svelte';

	export let language,
		traps,
		enemies,
		otherBuffsList,
		statMods,
		specialMods,
		mapConfig,
		eliteMode,
		normalMods,
		eliteMods,
		rogueTopic,
		selectedRelics,
		otherStores;

	$: moddedEnemies = applyMods(enemies, mapConfig.id, $statMods, $specialMods);
	$: moddedTraps = applyTrapMods(traps, $statMods, $specialMods);
	$: modsCheck = compileStatModsForChecking(
		pruneExtraEnemies(enemies, mapConfig.levelId),
		mapConfig.id,
		$statMods,
		$specialMods
	);
	eliteMode.subscribe((v) => (GameConfig.eliteMode = v));
	specialMods.subscribe((v) => (GameConfig.specialMods = v));

	const promise = import('./EnemyWaves.svelte').then(({ default: C }) => C);
</script>

{#await promise then EnemyWaves}
	<EnemyWaves
		{mapConfig}
		enemies={moddedEnemies}
		{language}
		eliteMode={$eliteMode}
		{rogueTopic}
		{otherStores}
	>
		<EliteToggle
			slot="eliteMods"
			inWaveOptions={true}
			{eliteMode}
			{normalMods}
			mapNormalMods={mapConfig.n_mods}
			mapEliteMods={mapConfig.elite_mods}
			{eliteMods}
			{rogueTopic}
			{selectedRelics}
			stageId={mapConfig.levelId}
		/>
	</EnemyWaves>
{/await}
<TrapContainer
	{language}
	traps={filterTraps(moddedTraps)}
	{otherBuffsList}
	specialMods={$specialMods}
/>
<ModsCheck {language} {modsCheck} {mapConfig} />
<EnemyCount
	{mapConfig}
	enemies={pruneExtraEnemies(moddedEnemies, mapConfig.levelId)}
	eliteMode={$eliteMode}
	{language}
/>
<div class="sm:px-6">
	<EliteToggle
		{eliteMode}
		{normalMods}
		mapNormalMods={mapConfig.n_mods}
		mapEliteMods={mapConfig.elite_mods}
		{eliteMods}
		{rogueTopic}
		{selectedRelics}
		stageId={mapConfig.levelId}
	/>
	<EnemyStatDisplay
		enemies={pruneExtraEnemies(moddedEnemies, mapConfig.levelId)}
		{language}
		{specialMods}
		{otherBuffsList}
	/>
	<div id="stageNav" class="mt-8 sm:mt-16 scroll-mt-20">
		<slot name="nav" />
	</div>
</div>
