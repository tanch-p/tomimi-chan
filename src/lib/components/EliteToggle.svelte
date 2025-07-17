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
		mapNormalMods: any,
		rogueTopic: string,
		runes: any,
		selectedRelics: any,
		stageId: string,
		eliteMode,
		inWaveOptions = false;

	//hotfix to set hardMode to false on nav to another stage with hardMods
	$: if (mapEliteMods && !inWaveOptions) {
		eliteMode.set(false);
	}
	const ro4_SP7_BOSS_STAGES = [
		'level_rogue4_b-4',
		'level_rogue4_b-4-b',
		'level_rogue4_b-5',
		'level_rogue4_b-5-b'
	];

	onDestroy(() => {
		if (!inWaveOptions) {
			runes.set(null);
			eliteMode.set(false);
		}
	});
	const updateEliteMods = (option: boolean) => {
		if (option) {
			runes.set(mapEliteMods);
			switch (rogueTopic) {
				case 'rogue_skz':
					{
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
								selectedRelics.set([...$selectedRelics, relic]);
							}
						}
					}
					break;
			}
		} else {
			runes.set(mapNormalMods);
		}
	};

	eliteMode.subscribe((v) => updateEliteMods(v));

	$: [combatOpsColor, eliteOpsColor] = getEliteColors(rogueTopic);

	function getEliteIcon(stageId: string) {
		if (ro4_SP7_BOSS_STAGES.includes(stageId)) {
			return `/images/relics/${relicLookup['rogue_4_relic_final_6']}.webp`;
		}
		if (stageId === 'level_rogue4_b-8') {
			return `/images/relics/${relicLookup['rogue_4_relic_final_10']}.webp`;
		}
		return emergency_icon;
	}
</script>

{#if mapEliteMods}
	{#if inWaveOptions}
		<!-- used in wave options -->
		<EliteToggleBar {combatOpsColor} {eliteOpsColor} {eliteMode} {stageId} {getEliteIcon} />
	{:else}
		<MediaQuery>
			<div slot="pc" class="mt-8">
				<EliteToggleBar {combatOpsColor} {eliteOpsColor} {eliteMode} {stageId} {getEliteIcon} />
			</div>
			<button
				slot="mobile"
				id="elite-toggle"
				class={`fixed z-[3] bottom-[210px] right-[20px] md:right-[40px] flex items-center justify-center rounded-full w-[45px] h-[45px] pointer-events-auto ${
					$eliteMode ? `${eliteOpsColor}` : `${combatOpsColor}`
				}`}
				on:click={() => eliteMode.set(!$eliteMode)}
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
