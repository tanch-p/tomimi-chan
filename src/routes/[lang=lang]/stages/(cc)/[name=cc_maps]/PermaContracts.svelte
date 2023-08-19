<script lang="ts">
	import type { Language } from '$lib/types';
	import RiskTriangle from './RiskTriangle.svelte';
	import { selectedContracts } from './stores';
	import translations from '$lib/translations.json';
	import { onMount } from 'svelte';
	import { createSlider } from '$lib/functions/slider';

	export let language: Language,
		contracts = [];
	const ranks = [1, 2, 3];

	let toggleRankColor = false;
	let showGrid = false;
	let stickyTable = false;

	const handleClick = (category, option, selected, sameCategorySelected, index) => {
		if (selected) {
			selectedContracts.update((list) => list.filter((item) => item.img !== option.img));
		} else if (sameCategorySelected) {
			selectedContracts.update((list) => {
				list = list.filter((item) => item.category !== category);
				return [...list, { ...option, category: category, index }];
			});
		} else {
			selectedContracts.update((list) => [...list, { ...option, category: category, index }]);
		}
	};
	const getRankColor = (rank: number) => {
		switch (rank) {
			case 1:
				return 'bg-gray-500';
			case 2:
				return 'bg-gray-800';
			case 3:
				return 'bg-red-800';
		}
	};

	let cleanupSlider = () => {};
	onMount(() => {
		cleanupSlider = createSlider('.slider');

		return cleanupSlider;
	});
</script>

<div class={`max-w-4xl mx-auto ${stickyTable ? 'sticky top-16 sm:top-6 z-10' : ' '}`}>
	<div class="w-full flex flex-wrap place-content-end mb-1">
		<button
			on:click={() => (stickyTable = !stickyTable)}
			class={`text-xs font-semibold text-center py-1 px-2 border rounded-lg  ${
				stickyTable ? 'bg-gray-400' : 'border-gray-400'
			}`}
		>
			{translations[language].sticky_table}
		</button>
		<button
			on:click={() => (showGrid = !showGrid)}
			class={`text-xs font-semibold text-center py-1 px-2 border rounded-lg  ${
				showGrid ? 'bg-gray-400' : 'border-gray-400'
			}`}
		>
			{translations[language].toggle_grids}
		</button>
		<button
			on:click={() => (toggleRankColor = !toggleRankColor)}
			class={`text-xs font-semibold text-center py-1 px-2 border rounded-lg  ${
				toggleRankColor ? 'bg-gray-400' : 'border-gray-400'
			}`}
		>
			{translations[language].toggle_color}
		</button>
	</div>
	<div
		class={`slider flex w-full h-fit max-w-[900px] overflow-x-auto overflow-y-clip no-scrollbar select-none`}
	>
		<div class="bg-[#545753] md:sticky left-0 z-[1] border-x border-gray-700">
			{#each ranks as rank}
				<div class={`min-w-[50px] max-w-[100px] h-[65px] flex items-center `}>
					<div class="leading-[10px] mx-[4px]">
						<p class="text-[10px] text-gray-200 mb-1">
							Contigency <br /> Level
						</p>
						<RiskTriangle risk={rank} type="perma" />
					</div>
					<span class="text-white text-[50px] mr-[2px] font-normal font-sans">
						{rank}
					</span>
				</div>
			{/each}
		</div>
		<div class="grid grid-flow-col grid-rows-3 auto-cols-[65px] no-scrollbar">
			{#each contracts as category, index}
				{#each category['options'] as option}
					{@const selected = Boolean($selectedContracts.find((item) => item.img === option.img))}
					{@const sameCategorySelected = Boolean(
						$selectedContracts.find((item) => item.category === category.category)
					)}
					<div
						class={`${showGrid ? 'border' : ''} w-[65px] h-[65px] p-[1px] ${
							toggleRankColor ? getRankColor(option.rank) : 'bg-[#90928f]'
						} `}
					>
						{#if option?.img}
							<button
								type="button"
								title={option.tooltip[language]}
								on:click={() =>
									handleClick(category.category, option, selected, sameCategorySelected, index)}
							>
								<img
									src="https://res.cloudinary.com/dbqz7mebk/image/upload/v1680366257/tomimi.dev/cc/{option.img}.webp"
									alt={`${option.img}`}
									width="64px"
									height="64px"
									class={`aspect-[1/1] ${
										selected
											? 'bg-blue-500'
											: sameCategorySelected
											? 'bg-rose-600 opacity-90 brightness-75'
											: ''
									}`}
								/>{' '}
							</button>
						{/if}
					</div>
				{/each}
			{/each}
		</div>
	</div>
</div>

<style>
	.slider {
		position: relative;
		width: 100%;
		overflow-x: scroll;
		overflow-y: hidden;
	}

	.slider.active {
		cursor: grabbing;
		cursor: -webkit-grabbing;
	}
</style>
