<script lang="ts">
	import type { Language } from '$lib/types';
	import suiTimeList from '$lib/data/is/sui/disasters.json';
	import FloorEffect from './FloorEffect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import translations from '$lib/translations.json';
	import one from '$lib/images/is/mizuki/争斗.webp';
	import two from '$lib/images/is/mizuki/徒长.webp';
	import thr from '$lib/images/is/mizuki/众我.webp';
	import fou from '$lib/images/is/mizuki/给养.webp';
	import { difficulty, activeFloorEffects } from './stores';

	export let optionsOpen: boolean, language: Language;

	const lookup = {
		rogue_4_disaster_1: one,
		rogue_4_disaster_2: two,
		rogue_4_disaster_5: thr
	};
	suiTimeList.forEach((option) => {
		option.src = lookup[option.iconId];
	});
	let options = [];
	let level = 1;

	difficulty.subscribe((n) => {
		switch (true) {
			case n <= 5:
				options = suiTimeList.filter((ele) => ele.level == 1);
				level = 1;
				break;
			case n <= 11:
				options = suiTimeList.filter((ele) => ele.level == 2);
				level = 2;
				break;
			default:
				level = 3;
				options = suiTimeList.filter((ele) => ele.level == 3);
		}
		if ($activeFloorEffects.length > 0) {
			const updatedTimes = options.filter((ele) =>
				$activeFloorEffects.some((item) => item.iconId === ele.iconId)
			);
			activeFloorEffects.set([updatedTimes]);
		}
	});
</script>

<div
	class={`absolute left-[50%] -translate-x-[50%] mt-2 w-screen md:w-[700px] max-h-[calc(100vh_-_160px)] overflow-y-auto pb-8 rounded-md shadow-lg select-none bg-[#1c1c1c] transition-[opacity_transform] ease-in duration-150 ${
		optionsOpen ? 'opacity-90 translate-y-0' : 'invisible opacity-0 -translate-y-10'
	}`}
>
	<FloorSelect {language} />
	<div class="mx-auto mt-3 md:px-8">
		<hr class="border-neutral-600" />
		<div class="px-2 md:px-0">
			<p class="mt-4 font-medium text-lg text-red-400 text-center">
				{translations[language].mizuki_seaborn_call}
				<!-- <span class="font-normal text-sm text-near-white"
				>{translations[language].variation_max_2}</span
			> -->
			</p>
			<p class="font-normal text-sm text-near-white text-center">
				({translations[language].variation_max_2})
			</p>

			<div class="flex flex-col gap-y-4 mt-2">
				{#each suiTimeList as option}
					<FloorEffect effect={option} {language} />
				{/each}
			</div>
		</div>
	</div>
</div>
