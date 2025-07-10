<script>
	import { onMount } from 'svelte';
	let input = '';
	let isOpen = false;
	let highlightedIndex = -1;
	let groupedOptions = {}; // { [category]: string[] }

	// Simulate async fetch (e.g., from server or file)
	async function fetchSuggestions(query) {
		// Simulated data with grouping
		const allOptions = {
			"Main Story": ["Chapter 1", "Chapter 2", "Chapter 3"],
			"Events": ["Grani and the Knights’ Treasure", "Heart of Surging Flame", "Gavial the Great Chief Returns"],
			"Limited": ["Dossoles Holiday", "Stultifera Navis"]
		};

		// Simulate delay
		await new Promise((r) => setTimeout(r, 200));

		// Filter based on query
		const result = {};
		for (const [category, items] of Object.entries(allOptions)) {
			const matches = items.filter(item =>
				item.toLowerCase().includes(query.toLowerCase())
			);
			if (matches.length > 0) result[category] = matches;
		}
		return result;
	}

	let categories = [];

	$: if (input.trim()) {
		fetchSuggestions(input).then((res) => {
			groupedOptions = res;
			categories = Object.keys(res);
			isOpen = true;
			highlightedIndex = -1;
		});
	} else {
		groupedOptions = {};
		categories = [];
		isOpen = false;
		highlightedIndex = -1;
	}

	const allFlatOptions = () =>
		categories.flatMap(cat => groupedOptions[cat].map((opt) => ({ label: opt, category: cat })));

	const handleKeydown = (e) => {
		const flat = allFlatOptions();
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			isOpen = true;
			highlightedIndex = (highlightedIndex + 1) % flat.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			highlightedIndex = (highlightedIndex - 1 + flat.length) % flat.length;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (highlightedIndex >= 0) {
				selectOption(flat[highlightedIndex].label);
			}
		} else if (e.key === 'Escape') {
			isOpen = false;
		}
	};

	const selectOption = (value) => {
		input = value;
		isOpen = false;
		highlightedIndex = -1;
	};

	// Highlight match substrings
	function highlightMatch(option, query) {
		const regex = new RegExp(`(${query})`, 'ig');
		return option.replace(regex, `<mark class="bg-yellow-200">$1</mark>`);
	}

	let wrapper;
	onMount(() => {
		const clickOutside = (e) => {
			if (!wrapper.contains(e.target)) {
				isOpen = false;
			}
		};
		document.addEventListener('click', clickOutside);
		return () => document.removeEventListener('click', clickOutside);
	});
</script>

<!-- UI -->
<div
	class="relative w-full max-w-md"
	bind:this={wrapper}
	role="combobox"
	aria-expanded={isOpen}
>
	<label for="custom-datalist" class="block mb-1 font-semibold">Search Event</label>
	<input
		id="custom-datalist"
		type="text"
		class="w-full p-2 border rounded shadow-sm"
		bind:value={input}
		on:keydown={handleKeydown}
		role="textbox"
		aria-autocomplete="list"
		aria-controls="datalist-options"
	/>

	{#if isOpen && categories.length > 0}
		<div
			id="datalist-options"
			role="listbox"
			class="absolute z-10 w-full mt-1 border rounded bg-white shadow max-h-60 overflow-auto"
		>
			{#each categories as category}
				<div class="px-3 py-1 text-sm text-gray-500 bg-gray-100 sticky top-0 z-10">{category}</div>
				{#each groupedOptions[category] as option, i (option)}
					<div
						id={`option-${i}`}
						role="option"
						class={`px-3 py-2 cursor-pointer ${
							allFlatOptions()[highlightedIndex]?.label === option ? 'bg-blue-100' : ''
						}`}
						on:mousedown|preventDefault={() => selectOption(option)}
						on:mouseenter={() => {
							const flatIndex = allFlatOptions().findIndex(o => o.label === option);
							if (flatIndex !== -1) highlightedIndex = flatIndex;
						}}
						aria-selected={input === option}
					>
						{@html highlightMatch(option, input)}
					</div>
				{/each}
			{/each}
		</div>
	{/if}
</div>
