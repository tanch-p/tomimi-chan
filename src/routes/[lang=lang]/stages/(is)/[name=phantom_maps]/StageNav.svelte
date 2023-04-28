<script lang="ts">
	import { selectedFloor } from './stores';
	import combatOps from '$lib/images/is/phantom/combat_ops.webp';
	import encounter from '$lib/images/is/phantom/encounter.webp';
	import boss from '$lib/images/is/phantom/boss.webp';
	import translations from '$lib/translations.json';
	import romanNumerals from '$lib/roman_numerals.json';
	import stagesList from '$lib/data/stages/is_stages_list.json';

	export let language: string;

	let floor = 1;

	selectedFloor.subscribe((value) => (floor = value));

	const phantomStages = stagesList.filter((stage) => stage.tags.includes('rogue_phantom'));
	const combatStages = phantomStages.filter((stage) => stage.category === 'combat_ops');
	const encounterStages = phantomStages.filter((stage) => stage.category === 'encounter');
	const bossStages = phantomStages.filter((stage) => stage.category === 'boss');

	$: currentFloorCombatStages = combatStages.filter((stage) => stage.floors.includes(floor));
	$: currentFloorEncounterStages = encounterStages.filter((stage) => stage.floors.includes(floor));
	$: currentFloorBossStages = bossStages.filter((stage) => stage.floors.includes(floor));

	$: if (floor === 2) {
		currentFloorEncounterStages = [
			...currentFloorEncounterStages,
			...currentFloorCombatStages.filter((stage) => stage.floors.includes(1))
		];
		currentFloorCombatStages = currentFloorCombatStages.filter(
			(stage) => !stage.floors.includes(1)
		);
	}

	const languageStyles = {
		ja: 'py-2 w-[120px]',
		en: 'text-sm w-[100px] py-1',
		zh: 'whitespace-nowrap py-2 w-[120px]'
	};
</script>

<div
	class="grid grid-cols-[35px_auto_35px] items-center w-[100vw] md:w-max md:-translate-x-[55px] mt-16 mx-auto select-none shadow-lg "
>
	<div />
	<div class="md:grid grid-cols-[100px_auto]">
		<div />
		<p class="text-center text-lg font-medium shadow-lg mb-1 ">{romanNumerals[floor - 1]}</p>
	</div>
	<div />
	<div
		class={`${
			floor === 1 ? 'brightness-50' : 'hover:cursor-pointer hover:bg-neutral-700'
		} w-[35px] h-full flex items-center justify-center shadow-lg`}
		on:click={() => {
			if (floor > 1) {
				floor = floor - 1;
			}
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
			><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg
		>
	</div>
	<div class="grid auto-rows-auto">
		<div class="flex flex-col md:grid items-center shadow-lg md:grid-cols-[100px_490px]">
			<div class="md:h-[68px] pt-2 md:pt-0 flex items-center">
				<img
					alt={translations[language].combat_ops}
					src={combatOps}
					decoding="async"
					loading="lazy"
				/>
			</div>
			<div class="flex flex-wrap md:flex-wrap-reverse justify-center items-center mb-1">
				{#each currentFloorCombatStages as stageInfo}
					<a href={`/${language}/stages/${stageInfo.code + '_' + stageInfo[`name_${language}`]}`}>
						<div
							class={`hover:text-sky-400 py-1.5 px-1 hover:cursor-pointer text-center ${languageStyles[language]}`}
						>
							{stageInfo[`name_${language}`].replaceAll('_', ' ')}
						</div>
					</a>
				{/each}
			</div>
		</div>
		{#if currentFloorBossStages.length > 0}
			<div class="flex flex-col md:grid items-center shadow-lg md:grid-cols-[100px_490px]">
				<div class="md:h-[68px] pt-4 md:pt-0 flex items-center">
					<img
						alt={translations[language].boss_ops}
						src={boss}
						decoding="async"
						width="100px"
						loading="lazy"
					/>
				</div>
				<div class="flex flex-wrap items-center justify-center mb-1">
					{#each currentFloorBossStages as stageInfo}
						<a href={`/${language}/stages/${stageInfo.code + '_' + stageInfo[`name_${language}`]}`}>
							<div
								class={`hover:text-sky-400 py-1.5 px-1 hover:cursor-pointer text-center ${languageStyles[language]}`}
							>
								{stageInfo[`name_${language}`].replaceAll('_', ' ')}
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}
		{#if currentFloorEncounterStages.length > 0}
			<div class="flex flex-col md:grid items-center shadow-lg md:grid-cols-[100px_490px]">
				<div class="md:h-[68px] pt-4 md:pt-0 flex items-center">
					<img
						alt={translations[language].encounter}
						src={encounter}
						decoding="async"
						loading="lazy"
					/>
				</div>
				<div class="flex flex-wrap items-center justify-center mb-1">
					{#each currentFloorEncounterStages as stageInfo}
						<a href={`/${language}/stages/${stageInfo.code + '_' + stageInfo[`name_${language}`]}`}>
							<div
								class={`hover:text-sky-400 py-1.5 px-1 hover:cursor-pointer text-center ${languageStyles[language]}`}
							>
								{stageInfo[`name_${language}`].replaceAll('_', ' ')}
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<div
		class={`${
			floor === 6 ? 'brightness-50' : 'hover:cursor-pointer hover:bg-neutral-700'
		} w-[35px] h-full flex items-center justify-center shadow-lg`}
		on:click={() => {
			if (floor < 6) {
				floor = floor + 1;
			}
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 rotate-180"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
			><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg
		>
	</div>
</div>
