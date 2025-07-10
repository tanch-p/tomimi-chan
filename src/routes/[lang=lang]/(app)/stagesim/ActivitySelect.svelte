<script lang="ts">
	import type { Language } from '$lib/types';
	import { activity, stage } from './stores.js';
	import translations from '$lib/translations.json';
	export let language: Language;

	let events = ['Event A', 'Event B', 'Event C'];
	let isOpen = false;
	let highlightedIndex = -1;
	let selected;
	const options = [0, 1, 2, 3];
	const toggleDropdown = () => (isOpen = !isOpen);
	const selectOption = (option) => {
		selected = option;
		isOpen = false;
		highlightedIndex = -1;
	};

	const handleKeydown = (e) => {
		if (!isOpen) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			highlightedIndex = (highlightedIndex + 1) % options.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			highlightedIndex = (highlightedIndex - 1 + options.length) % options.length;
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (highlightedIndex >= 0) {
				selectOption(options[highlightedIndex]);
			}
		} else if (e.key === 'Escape') {
			isOpen = false;
			highlightedIndex = -1;
		}
	};

	let dropdownEl;
</script>

<div
	class="relative w-64"
	role="combobox"
	aria-haspopup="listbox"
	aria-expanded={isOpen}
	aria-labelledby="event-label"
	bind:this={dropdownEl}
>
	<label id="event-label" class="block mb-1 font-semibold">Select Event</label>
	<div
		tabindex="0"
		role="button"
		class="border p-2 rounded bg-white shadow-sm cursor-pointer flex justify-between items-center"
		on:click={toggleDropdown}
		on:keydown={handleKeydown}
		aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
	>
		<span>{selected || 'Select an event...'}</span>
		<span class="ml-2">▼</span>
	</div>

	{#if isOpen}
		<div
			role="listbox"
			class="absolute z-10 mt-1 border rounded shadow bg-white w-full max-h-60 overflow-auto"
		>
			{#each options as option, i}
				<div
					id={`option-${i}`}
					role="option"
					aria-selected={selected === option}
					class={`p-2 cursor-pointer ${highlightedIndex === i ? 'bg-blue-100' : ''} ${
						selected === option ? 'font-bold' : ''
					}`}
					on:click={() => selectOption(option)}
					on:mouseenter={() => (highlightedIndex = i)}
				>
					{option}
				</div>
			{/each}
		</div>
	{/if}
</div>
