<script lang="ts">
	import RiskTriangle from './RiskTriangle.svelte';
	import { selectedContracts } from './stores';

	export let language: string,
		contracts = [];
	const ranks = [1, 2, 3];

	const handleClick = (category, option, selected, sameCategorySelected) => {
		if (selected) {
			selectedContracts.update((list) => list.filter((item) => item.img !== option.img));
		} else if (sameCategorySelected) {
			selectedContracts.update((list) => {
				list = list.filter((item) => item.category !== category);
				return [...list, { ...option, category: category }];
			});
		} else {
			selectedContracts.update((list) => [...list, { ...option, category: category }]);
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
</script>

<div class={`max-w-4xl mx-auto md:w-[740px]`}>
	<div class="w-screen md:w-full overflow-x-scroll md:overflow-hidden text-black">
		<div
			class="flex flex-wrap flex-row md:min-h-min overflow-auto w-max select-none bg-neutral-300 "
		>
			{#each ranks as rank}
				<div class="border md:max-w-[250px] min-h-[30px] mx-2 mb-2 bg-[rgb(153,159,163)]">
					<div class="rounded flex flex-wrap flex-row h-[24px] mb-1">
						<p class={`text-white ${getRankColor(rank)} rounded-l px-1`}>危機等級</p>
						<RiskTriangle risk={rank} type={'daily'} />
					</div>
					<div class="grid grid-rows-3">
						{#each contracts as category}
							{#each category['options'] as option}
								{@const selected = Boolean(
									$selectedContracts.find((item) => item.img === option.img)
								)}
								{@const sameCategorySelected = Boolean(
									$selectedContracts.find((item) => item.category === category.category)
								)}
								{#if option.rank === rank}
									<button
										class={`flex flex-wrap flex-row place-items-center rounded md:min-w-min h-[60px] mx-2 my-1 active:brightness-75 cursor-pointer ${
											selected
												? 'bg-blue-500 text-near-white'
												: sameCategorySelected
												? 'bg-rose-600 opacity-90 brightness-75 text-near-white'
												: 'bg-[rgb(208,214,214)]'
										}`}
										title={option.tooltip[language]}
										on:click={() =>
											handleClick(category.category, option, selected, sameCategorySelected)}
									>
										<img
											src="https://res.cloudinary.com/dbqz7mebk/image/upload/v1680366257/tomimi.dev/cc/{option.img}.webp"
											alt={`${option.img}`}
											width="60px"
											height="60px"
											class={`aspect-[1/1]`}
										/>
										<p
											class={`text-start px-2 ${
												language === 'en'
													? 'text-sm font-semibold w-[152px]'
													: 'font-medium w-[150px]'
											}`}
										>
											{option.name[language]}
										</p>
									</button>
								{/if}
							{/each}
						{/each}
					</div>
				</div>
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
