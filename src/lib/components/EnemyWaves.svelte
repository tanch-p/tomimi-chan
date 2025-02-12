<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import translations from '$lib/translations.json';
	import TogglePanel from './TogglePanel.svelte';
	import {
		generateWaveTimeline,
		getEnemyCountPermutations,
		getOptions,
		handleOptionsUpdate
	} from '$lib/functions/waveHelpers';
	import DraggableContainer from './DraggableContainer.svelte';
	import DLDGPN from '$lib/images/is/DLDGPN.webp';
	import StageSimulator from '$lib/components/StageSimulator/index.svelte';

	export let mapConfig,
		enemies,
		rogueTopic: RogueTopic,
		language: Language,
		eliteMode: Boolean,
		otherStores;

	let hiddenGroups = [],
		enemyCounts = [],
		selectedCountIndex = 0,
		selectedPermutationIdx = 0;
	$: if (mapConfig) {
		selectedCountIndex = 0;
		selectedPermutationIdx = 0;
	}

	$: hasAnalysis = !mapConfig.id.includes('_duel_');
	$: options = getOptions(mapConfig, rogueTopic, language);
	$: permutations = getEnemyCountPermutations(mapConfig, hiddenGroups, eliteMode);
	$: enemyCounts = permutations.reduce((acc, { count }) => {
		if (!acc.includes(count)) {
			acc.push(count);
		}
		return acc;
	}, []);
	$: permutationsToShow = permutations.reduce((acc, { count, permutation, bonus }) => {
		if (count === enemyCounts[selectedCountIndex]) {
			acc.push({ count, permutation, bonus: Boolean(bonus) });
		}
		return acc;
	}, []);

	if (rogueTopic === 'rogue_skz') {
		otherStores.disaster.subscribe((v) => {
			if (v[0]?.iconId === 'rogue_4_disaster_1') {
				hiddenGroups.push('calamity');
			} else {
				hiddenGroups = hiddenGroups.filter((key) => key !== 'calamity');
			}
		});
	}
</script>

{#if hasAnalysis}
	<TogglePanel title={translations[language].enemy_routes} size="subheading" isOpen={true}>
		<div class="grid grid-cols-[120px_1fr] divide-y divide-neutral-700 border-y border-neutral-700">
			{#if mapConfig.elite_mods}
				<p class="title">{translations[language].operation_type}</p>
				<slot name="eliteMods" />
			{/if}
			{#if options?.length > 0}
				<p class="title">{translations[language].hidden_options}</p>
				<div class="grid grid-cols-3 md:grid-cols-5">
					{#each options as { key, src, name }}
						{@const selected = hiddenGroups.includes(key)}
						<button
							class="flex flex-col items-center border border-neutral-700 py-1 {selected
								? 'bg-gray-600'
								: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
							on:click={() => (hiddenGroups = handleOptionsUpdate(hiddenGroups, key, rogueTopic, otherStores))}
						>
							<div class="flex items-center justify-center h-[56px]">
								<img {src} width="56" height="56" alt={name} class="" />
							</div>
							<span class="mt-1 text-xs md:text-sm">{name}</span>
						</button>
					{/each}
				</div>
			{/if}
			<p class="title">{translations[language].enemy_count}</p>
			<DraggableContainer className="grid grid-flow-col auto-cols-[minmax(100px,1fr)]">
				{#each enemyCounts as count, i}
					<button
						class="flex justify-center items-center border-r border-neutral-700 font-semibold text-xl {selectedCountIndex ===
						i
							? 'bg-gray-600'
							: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
						on:click={() => (selectedCountIndex = i)}
					>
						{count}
					</button>
				{/each}
			</DraggableContainer>
			{#if permutationsToShow.length > 0}
				<p class="title">{translations[language].permutation}</p>
				<DraggableContainer className="grid grid-flow-col auto-cols-[minmax(120px,1fr)]">
					{#each permutationsToShow as { bonus }, i}
						<button
							class="flex justify-center items-center border-r border-neutral-700 font-semibold text-xl {selectedPermutationIdx ===
							i
								? 'bg-neutral-600'
								: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
							on:click={() => (selectedPermutationIdx = i)}
						>
							{i + 1}
							{#if bonus}
								<span class="mx-3">+</span>
								<img src={DLDGPN} width="56" height="56" alt="bonus" />
							{/if}
						</button>
					{/each}
				</DraggableContainer>
			{/if}
		</div>
		<StageSimulator
			{mapConfig}
			{enemies}
			waveData={generateWaveTimeline(
				mapConfig,
				hiddenGroups,
				eliteMode,
				permutationsToShow[selectedPermutationIdx],
				mapConfig.levelId
			)}
		/>
	</TogglePanel>
{/if}

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
