<script lang="ts">
	import { selectedContracts } from './stores';
	import RankTriangles from './RiskTriangle.svelte';
	import translations from '$lib/translations.json';
	import { onMount, onDestroy } from 'svelte';
	import { createSlider } from '$lib/functions/slider';

	export let ccType: 'perma' | 'daily' = 'perma',
		language: string,
		mapConfig;

	$: if (mapConfig) {
		selectedContracts.set([]);
	}

	let sortedContracts = [];
	selectedContracts.subscribe(
		(value) =>
			(sortedContracts = value.sort((a, b) => {
				if (a.index < b.index) {
					return -1;
				}
				if (a.index > b.index) {
					return 1;
				}
				return 0;
			}))
	);

	$: totalRisk = $selectedContracts.reduce((acc, curr) => (acc += curr.rank), 0);

	let cleanupSlider = () => {};
	onMount(() => {
		cleanupSlider = createSlider('.selected-slider');
	});
	onDestroy(() => {
		cleanupSlider();
	});
</script>

<div class={`max-w-4xl mx-auto ${ccType === 'daily' ? 'md:w-[740px]' : ''}`}>
	<div class="selected-slider bg-[#2e2c2c] border-b border-b-gray-400 ">
		<div
			class="relative flex flex-wrap flex-col gap-y-2 py-2 w-screen md:w-full max-h-[300px] md:h-[300px] md:max-w-[900px] text-[12px] lg:text-md  text-gray-300"
		>
			{#each sortedContracts as option}
				<div class={`flex ${ccType === 'daily' ? '' : 'md:w-[50%]'}`}>
					<RankTriangles risk={option.rank} type="perma" />
					<p class={`mx-2`}>
						{option.tooltip[language]}
					</p>
				</div>
			{/each}
		</div>
	</div>
	<div
		class="flex flex-wrap border border-gray-800 w-[100vw] overflow:hidden md:w-full h-[50px] max-w-[900px] py-2 mb-2 select-none place-items-center bg-[#2e2c2c]"
	>
		<button
			class="flex flex-wrap bg-white border rounded border-gray-800 mx-1 px-1 h-[80%] cursor-pointer active:bg-gray-400"
			on:click={() => selectedContracts.set([])}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="black"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width={2}
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
				/>
			</svg>
			<p class="font-semibold text-black">
				{translations[language].cc_clear}
			</p>
		</button>
		<div
			class="flex flex-wrap flex-col px-2 h-[110%] border-r-2 border-r-black leading-[16px] text-white"
		>
			<div class="w-full">
				<p class="text-[10px] ">危機等級</p>
			</div>
			<div class="w-full">
				<p class="text-right text-[20px]">{totalRisk}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.selected-slider {
		position: relative;
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
	}
</style>
