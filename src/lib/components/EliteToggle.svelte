<script lang="ts">
	import { onDestroy } from 'svelte';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';
	import skzRelics from '$lib/data/is/sarkaz/relics_sarkaz.json';
	import { relicLookup } from '$lib/data/is/relic_lookup';
	import { getEliteColors } from '$lib/functions/lib';
	import MediaQuery from './MediaQuery.svelte';
	import EliteToggleBar from './EliteToggleBar.svelte';

	export let mapEliteMods: any,
		rogueTopic: string,
		eliteMods: any,
		normalMods: any,
		mapNormalMods: any,
		selectedRelics: any,
		stageId: string,
		eliteMode,
		inWaveOptions = false

	//hotfix to set hardMode to false on nav to another stage with hardMods
	$: if (mapEliteMods && !inWaveOptions) {
		updateEliteMods(false);
	}
	const ro4_SP7_BOSS_STAGES = [
		'level_rogue4_b-4',
		'level_rogue4_b-4-b',
		'level_rogue4_b-5',
		'level_rogue4_b-5-b'
	];

	onDestroy(() => {
		if (!inWaveOptions) {
			eliteMods.set(null);
			eliteMode.set(false);
		}
	});

	const updateEliteMods = (option: boolean) => {
		eliteMode.set(option);
		if (option) {
			eliteMods.set(mapEliteMods);
			normalMods.set(null);
			if (rogueTopic === 'rogue_skz') {
				let relicId = '';
				if (ro4_SP7_BOSS_STAGES.includes(stageId)) {
					relicId = 'rogue_4_relic_final_6';
				}
				if (stageId === 'level_rogue4_b-8') {
					relicId = 'rogue_4_relic_final_10';
				}
				if (relicId) {
					if (!$selectedRelics.find((item) => item.id === relicId)) {
						const relic = skzRelics.find((item) => item.id === relicId);
						selectedRelics.update((list) => (list = [...list, relic]));
					}
				}
			}
		} else {
			eliteMods.set(null);
			normalMods.set(mapNormalMods);
		}
	};
	$: [combatOpsColor, eliteOpsColor] = getEliteColors(rogueTopic);

	function getEliteIcon(stageId) {
		if (ro4_SP7_BOSS_STAGES.includes(stageId)) {
			return relicLookup['rogue_4_relic_final_6'];
		}
		if (stageId === 'level_rogue4_b-8') {
			return relicLookup['rogue_4_relic_final_10'];
		}
		return emergency_icon;
	}
</script>

{#if mapEliteMods}
	{#if inWaveOptions}
		<!-- used in wave options -->
		<EliteToggleBar
			{combatOpsColor}
			{eliteOpsColor}
			{eliteMode}
			{stageId}
			{getEliteIcon}
			{updateEliteMods}
		/>
	{:else}
		<MediaQuery>
			<div slot="pc" class="mt-8">
				<EliteToggleBar
					{combatOpsColor}
					{eliteOpsColor}
					{eliteMode}
					{stageId}
					{getEliteIcon}
					{updateEliteMods}
				/>
			</div>
			<button
				slot="mobile"
				id="elite-toggle"
				class={`fixed z-[3] bottom-[210px] right-[20px] md:right-[40px] flex items-center justify-center rounded-full w-[45px] h-[45px] pointer-events-auto ${
					$eliteMode ? `${eliteOpsColor}` : `${combatOpsColor}`
				}`}
				on:click={() => updateEliteMods(!$eliteMode)}
			>
				<img
					src={$eliteMode ? getEliteIcon(stageId) : combat_icon}
					width="40px"
					decoding="async"
					loading="lazy"
					alt={'elite toggle'}
					class=""
				/>
			</button>
		</MediaQuery>
	{/if}
{/if}
