<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import activitiesList from '$lib/data/stages/activities_list.json';
	import { activityIdStore, stageIdStore } from './stores.js';
	import Icon from '$lib/components/Icon.svelte';
	import { clickOutside } from '$lib/functions/clickOutside.js';

	export let language: Language;

	// return {activityName, stageCode, name}
	// 主线 15-2 执此剑者
	// 活动 AD-EX-8 舞台与无尽的阶梯
	const allOptions = activitiesList.flatMap((activity) =>
		activity.zones.flatMap((zone) =>
			zone.stages.map((stage) => {
				return {
					activityId: activity.id,
					activityName: activity.name[language] || activity.name['zh'],
					stageId: stage.stageId,
					code: stage.code,
					name: stage.name[language] || stage.name['zh']
				};
			})
		)
	);
	let input = '';
	let isOpen = false;
	let highlightedIndex = -1;
	let searchResults = [];
	let listElement: HTMLDivElement;

	function fetchSuggestions(query: string) {
		searchResults = allOptions.filter((item) => item.code.includes(query.toUpperCase()));
		isOpen = searchResults.length > 0;
		highlightedIndex = -1;
	}

	function handleInput(event) {
		const raw = event.target.value;
		// Only allow A-Z, a-z, 0-9, and dashes, then convert to uppercase
		input = raw.replace(/[^a-zA-Z0-9-]/g, '').toUpperCase();
		if (input.trim()) {
			fetchSuggestions(input);
		} else {
			isOpen = false;
			highlightedIndex = -1;
		}
	}
	const handleKeydown = (e) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			isOpen = true;
			highlightedIndex = highlightedIndex + 1;
			if (highlightedIndex > searchResults.length - 1) {
				highlightedIndex = 0;
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			highlightedIndex = highlightedIndex - 1;
			if (highlightedIndex < 0) {
				highlightedIndex = searchResults.length - 1;
			}
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (highlightedIndex >= 0) {
				selectOption(searchResults[highlightedIndex]);
			} else {
				const option = searchResults.find((ele) => ele.code === input);
				if (option) {
					selectOption(option);
				}
			}
		} else if (e.key === 'Escape') {
			isOpen = false;
			highlightedIndex = -1;
		}
	};
	const selectOption = (option) => {
		isOpen = false;
		highlightedIndex = -1;
		const { activityId, stageId, code } = option;
		input = code;
		activityIdStore.set(activityId);
		stageIdStore.set(stageId);
	};

	$: if (highlightedIndex >= 0 && isOpen) {
		const ele = document.getElementById(`data-option-${highlightedIndex}`);
		if (ele) {
			ele.scrollIntoView({
				block: 'nearest' // only scrolls if needed
			});
		}
	}
</script>

<div
	class="relative w-full max-w-md"
	use:clickOutside
	on:outclick={() => (isOpen = false)}
	role="combobox"
	aria-expanded={isOpen}
>
	<label for="search-datalist" class="flex items-center gap-2 mb-1">
		<Icon name="icon-search" size={20} />
		{translations[language].search_stage_by_code}
	</label>
	<input
		id="search-datalist"
		type="text"
		role="textbox"
		aria-autocomplete="list"
		aria-controls="datalist-options"
		class="w-full p-2 border rounded shadow-sm focus:outline-none text-almost-black"
		bind:value={input}
		on:keydown={handleKeydown}
		on:input={handleInput}
		placeholder="0-1, 7-18, MT-EX-8..."
	/>

	{#if isOpen && searchResults.length > 0}
		<div
			id="datalist-options"
			role="listbox"
			bind:this={listElement}
			class="absolute z-[1] w-full mt-1 border rounded bg-near-white shadow max-h-60 overflow-auto text-almost-black"
		>
			<div
				class="sticky top-0 z-[1] grid grid-cols-[100px_100px_1fr] text-gray-500 bg-gray-200 px-3 py-1 text-xs"
			>
				<span class="text-center">主题</span>
				<span class="text-center">代码</span>
				<span class="ml-2">关卡名字</span>
			</div>
			{#each searchResults as option, i (option)}
				{@const { activityName, code, name } = option}
				<div
					id={`data-option-${i}`}
					role="option"
					aria-selected={highlightedIndex === i}
					class={`grid grid-cols-[100px_100px_1fr] px-3 py-2 cursor-pointer ${
						highlightedIndex === i ? 'bg-blue-100' : ''
					}`}
					on:mousedown|preventDefault={() => selectOption(option)}
					on:mouseenter={() => {
						if (i !== -1) highlightedIndex = i;
					}}
				>
					<span class="text-center truncate">{activityName}</span>
					<span class="text-center">{code}</span>
					<span class="ml-2">{name}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
