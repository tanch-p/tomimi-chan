<script lang="ts">
	import type { Language } from '$lib/types';
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import activitiesList from '$lib/data/stages/activities_list.json';
	import { activityIdStore, stageIdStore } from './stores.js';
	import translations from '$lib/translations.json';
	import Icon from '$lib/components/Icon.svelte';
	export let language: Language;

	const categories = activitiesList.reduce((acc, curr) => {
		if (!acc[curr.type]) {
			acc[curr.type] = [];
		}
		acc[curr.type].push({ id: curr.id, name: curr?.name?.[language] || curr?.name?.['zh'] });
		return acc;
	}, {});
	const allFlatOptions = Object.entries(categories).flatMap(([_, activities]) => activities);

	$: currentActivity = activitiesList.find((ele) => ele.id === $activityIdStore);
	$: title = currentActivity
		? currentActivity.name[language] || currentActivity.name['zh']
		: $activityIdStore;
	let isOpen = false;
	let highlightedIndex = -1;
	let selectedIndex = -1;
	let listElement: HTMLDivElement;

	activityIdStore.subscribe(
		(id) => (selectedIndex = allFlatOptions.findIndex((ele) => ele.id === id))
	);

	const toggleDropdown = () => (isOpen = !isOpen);
	const selectOption = (option) => {
		activityIdStore.set(option.id);
		isOpen = false;
		highlightedIndex = -1;
	};

	const handleKeydown = (e) => {
		if (!isOpen) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			highlightedIndex = highlightedIndex + 1;
			if (highlightedIndex > allFlatOptions.length - 1) {
				highlightedIndex = 0;
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			highlightedIndex = highlightedIndex - 1;
			if (highlightedIndex < 0) {
				highlightedIndex = allFlatOptions.length - 1;
			}
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (highlightedIndex >= 0) {
				selectOption(allFlatOptions[highlightedIndex]);
			}
		} else if (e.key === 'Escape') {
			isOpen = false;
			highlightedIndex = -1;
		}
	};
	$: if ((highlightedIndex >= 0 || selectedIndex >= 0) && isOpen) {
		const indexToUse = highlightedIndex >= 0 ? highlightedIndex : selectedIndex;
		const ele = document.getElementById(`select-option-${indexToUse}`);
		if (ele) {
			ele.scrollIntoView({
				block: 'nearest' // only scrolls if needed
			});
		}
	}
</script>

<div>
	<div
		class="relative w-full max-w-md"
		role="combobox"
		aria-haspopup="listbox"
		aria-expanded={isOpen}
		aria-labelledby="event-label"
		use:clickOutside
		on:outclick={() => (isOpen = false)}
	>
		<label id="event-label" class="flex items-center gap-2 mb-1">
			<Icon name="icon-list2" size={20} />
			{translations[language].select_from_dropdown}
		</label>
		<div
			tabindex="0"
			role="button"
			class="border p-2 rounded bg-near-white shadow-sm cursor-pointer flex justify-between items-center text-almost-black"
			on:click={toggleDropdown}
			on:keydown={handleKeydown}
			aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
		>
			<span>{title}</span>
			<span class="ml-2">▼</span>
		</div>

		<div
			role="listbox"
			class="absolute z-[1] mt-1 border rounded shadow bg-white w-full max-h-72 md:max-h-[24rem] overflow-auto text-almost-black {isOpen
				? ''
				: 'opacity-0 pointer-events-none'}"
			bind:this={listElement}
		>
			{#each Object.entries(categories) as [key, options]}
				<div class="px-3 py-1 text-sm text-gray-500 bg-gray-200 sticky top-0 z-[1]">
					{translations[language][`stage.${key}`]}
				</div>
				{#each options as option}
					{@const flatIndex = allFlatOptions.findIndex((ele) => ele.id === option.id)}
					<div
						id="select-option-{flatIndex}"
						role="option"
						aria-selected={highlightedIndex === flatIndex}
						class={`p-2 cursor-pointer ${highlightedIndex === flatIndex ? 'bg-blue-100' : ''} ${
							$activityIdStore === option.id ? 'bg-blue-200' : ''
						}`}
						on:click={() => selectOption(option)}
						on:mouseenter={() => (highlightedIndex = flatIndex)}
					>
						{option.name}
					</div>
				{/each}
			{/each}
		</div>
	</div>
	<div class="mt-4 space-y-3">
		{#each currentActivity.zones as zone}
			<div>
				{#if zone.zoneNameSecond || zone.label}
					{@const hasSeparator = zone.zoneNameSecond && zone.label}
					<p>
						{zone.label?.toUpperCase() || ''}
						{#if hasSeparator} - {/if}{zone.zoneNameFirst?.[language] || ''}{zone.zoneNameSecond?.[
							language
						] || ''}
					</p>
				{/if}
				<div class="flex flex-wrap gap-x-2 gap-y-2 mt-1 text-sm">
					{#each zone.stages as stage}
						<button
							aria-selected={$stageIdStore === stage.stageId}
							class="rounded px-2 py-0.5 text-almost-black {$stageIdStore === stage.stageId
								? 'bg-slate-500 text-near-white'
								: 'bg-near-white hover:bg-slate-400'}"
							on:click={() => stageIdStore.set(stage.stageId)}
						>
							{stage.code}
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
