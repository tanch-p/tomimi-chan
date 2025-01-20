<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TogglePanel from './TogglePanel.svelte';
	import EliteToggle from './EliteToggle.svelte';
	import { relicLookup } from "$lib/data/is/relic_lookup";
	import byokai from '$lib/images/enemy_icons/icon_enemy_1106_byokai.webp';
	import DLDGPN from '$lib/images/is/DLDGPN.webp';
	// import { arrayCompare, getTimelineFile } from '$lib/functions/lib';
	import DLD from '$lib/images/enemy_icons/icon_enemy_2001_duckmi.webp';
	import GPN from '$lib/images/enemy_icons/icon_enemy_2002_bearmi.webp';
	import THF from '$lib/images/enemy_icons/icon_enemy_2034_sythef.webp';
	import FAT from '$lib/images/enemy_icons/icon_enemy_2085_skzjxd.webp';
	import sami_smbox from '$lib/images/is/sami/sktok_smbox.webp';
	import sami_smrbox from '$lib/images/is/sami/sktok_smrbox.webp';
	import sami_smbbox from '$lib/images/is/sami/sktok_smbbox.webp';
	import skzbox from '$lib/images/is/sarkaz/skzbox.webp';
	import skzmbx from '$lib/images/is/sarkaz/skzmbx.webp';
	import skzwyx from '$lib/images/is/sarkaz/skzwyx.webp';
	import SpEnemy from '$lib/components/SpEnemy.svelte';
	import { getWaveData } from '$lib/functions/waveHelpers';

	export let language: Language, mapConfig, rogueTopic, eliteMods;
	let options = [
		{ key: 'bossrelic', src: relicLookup['rogue_3_relic_boss_2b'], selected: false },
		{ key: 'totem1', src: byokai, selected: false }
	];
	// $: bonus = timeline?.bonus;
	let selectedCountIndex = 0;
	let selectedPatternIndex = 0;

	$: promise = getWaveData(rogueTopic, mapConfig.levelId);

	const getTimelineOption = (options = [], eliteMods, timeline) => {
		let baseTag = 'NORMAL';
		if (eliteMods) baseTag = 'ELITE';
		const selectedOptions = options.filter((ele) => ele.selected).map((ele) => ele.key);
		selectedOptions.push(baseTag);
		const keys = Object.keys(timeline);
		const tagKey = keys.find((key) => {
			const tag = key.split('|');
			return arrayCompare(selectedOptions.sort(), tag.sort());
		});
		return timeline[tagKey];
	};
	const getBonusChance = (data) => {};
</script>

{#await promise}
	Loading ...
{:then waveData}

	{#if waveData && Object.keys(waveData).length > 0}
		{@const a = console.log(waveData)}
		{@const data = getTimelineOption(options, $eliteMods, waveData)}
		{@const counts = data
			.reduce((acc, curr) => {
				if (!acc.includes(curr.count)) {
					acc.push(curr.count);
				}
				return acc;
			}, [])
			.sort()}
		<TogglePanel title="出怪波次分析" size="subheading">
			<div class="grid grid-cols-[120px_1fr] px-1.5 divide-y divide-neutral-700">
				{#if mapConfig.elite_mods}
					<p class="title border-t border-neutral-700">{translations[language].operation_type}</p>
					<EliteToggle mapEliteMods={mapConfig.elite_mods} {eliteMods} {rogueTopic} />
				{/if}
				<p class="title">
					{translations[language].hidden_groups}
				</p>
				<div class="grid grid-flow-col auto-cols-fr">
					{#each options as { key, src, selected }}
						<button
							class="flex justify-center items-center border-r border-neutral-700 {selected
								? 'bg-gray-600'
								: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
							on:click={() => (selected = !selected)}
						>
							<img {src} width="58" height="58" alt={key} />
						</button>
					{/each}
				</div>
				<p class="title">{translations[language].max_permutations}</p>
				<p class="flex justify-center items-center text-center text-xl truncate">
					{waveData?.permutations?.max_permutations}
				</p>
				<p class="title">
					<span>{translations[language].table_headers.enemy}</span><span
						>{translations[language].table_headers.count}</span
					>
				</p>
				<div class="overflow-auto no-scrollbar">
					<div class="flex h-full">
						{#each counts as count, i}
							<button
								class="grow shrink-0 basis-20 {selectedCountIndex === i
									? 'bg-gray-600'
									: 'brightness-50'}"
								on:click={() => (selectedCountIndex = i)}
							>
								{count}
							</button>
						{/each}
					</div>
				</div>
				<p class="title">
					{translations[language].bonus_chance}
				</p>
				<div class="flex justify-center items-center gap-x-1">
					<img
						src={DLDGPN}
						height="58px"
						width="58px"
						decoding="async"
						loading="lazy"
						alt="sp enemy"
						class="bg-[#0a0a0a]"
					/>
				</div>
				{#if data.length > 1}
					<p class="title">{translations[language].pattern}</p>
					<div class="overflow-auto no-scrollbar">
						<div class="grid grid-flow-col auto-cols-[100px] h-[50px] text-xl">
							{#each data as pattern, i}
								<button
									class="grow {selectedPatternIndex === i ? 'bg-gray-600' : 'brightness-50'}"
									on:click={() => (selectedPatternIndex = i)}
								>
									pattern {i + 1}
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<div class="overflow-auto no-scrollbar max-h-[800px]">
				{#if data[selectedPatternIndex]}
					{#each data[selectedPatternIndex]['waves'] as wave}
						<p>maxTimeWaitingForNextWave: {wave.maxTimeWaitingForNextWave}</p>
						<p>postDelay: {wave.postDelay}</p>
						<p>preDelay: {wave.preDelay}</p>
						{#each Object.keys(wave.timeline) as time, timeIdx}
							<table>
								<thead>
									<tr>
										<th>Time</th>
										<th>#</th>
										<th>Enemy</th>
										<th>Spawn Loc.</th>
									</tr>
								</thead>
								<tbody>
									{#each wave.timeline[time] as action, i}
										{@const enemy = enemies.find((enemy) => {
											let key = action.key;
											if (key.includes('byokai_b')) key = key.replace('byokai_b', 'byokai');
											return enemy.key === key;
										})}
										<tr>
											{#if i === 0}
												<td rowspan={wave.timeline[time].length}>{time}</td>
											{/if}
											<td>
												{timeIdx + i + 1}
											</td>
											<td>
												<img src={enemy?.img} width="75" height="75" alt={action['key']} />{action[
													'key'
												]}
											</td>
											<td>{action['route']}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						{/each}
					{/each}
				{/if}
			</div>
		</TogglePanel>
	{/if}
{/await}

<style>
	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: 58px;
		padding: 0 6px;
		background-color: rgb(23, 23, 23);
	}
</style>
