<script lang="ts">
	import type { Language } from '$lib/types';
	import FloorEffect from './FloorEffect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import translations from '$lib/translations.json';
	import chaosImg from '$lib/images/is/sami/非线性.webp';
	import chaosList from '$lib/data/chaos_sami.json';

	export let optionsOpen: boolean, language: Language;

	chaosList.forEach((option) => {
		option.src = chaosImg;
	});
</script>

<div
	class={`absolute left-[50%] -translate-x-[50%] mt-2 w-screen md:w-[700px] pb-8 rounded-md shadow-lg select-none bg-[#1c1c1c] transition-[opacity_transform] ease-in duration-150 ${
		optionsOpen ? 'opacity-90 translate-y-0' : 'invisible opacity-0 -translate-y-10'
	}`}
>
	<FloorSelect {language} />
	<div class="mx-auto mt-3 md:px-8">
		<hr class="border-neutral-600" />
		<div class="px-2 md:px-0">
			<p class="mt-4 font-medium text-lg text-purple-400 text-center">
				{translations[language].sami_chaos}
				<!-- <span class="font-normal text-sm text-near-white"
				>{translations[language].variation_max_2}</span
			> -->
			</p>

			<div class="flex flex-col gap-y-4 mt-2">
				{#each chaosList as option}
					<FloorEffect effect={option} {language} />
				{/each}
			</div>
		</div>
	</div>
</div>
