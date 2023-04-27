<script lang="ts">
	import phantomVariations from '$lib/data/variations_phantom.json';
	import FloorEffect from './FloorEffect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import translations from '$lib/translations.json';

	export let optionsOpen: boolean, language: string;
</script>

<div
	class={`absolute left-[50%] -translate-x-[50%] mt-2 w-screen md:w-[700px] pb-8 rounded-md shadow-lg select-none bg-[#1c1c1c] transition-[opacity_transform] ease-in duration-150 ${
		optionsOpen ? 'opacity-90 translate-y-0' : 'invisible opacity-0 -translate-y-10'
	}`}
>
	<FloorSelect {language} />
	<div class="mx-auto mt-3 px-2 md:px-8">
		<hr class="border-neutral-600" />
		<p class="mt-4 font-medium text-lg text-red-400 text-center">
			{translations[language].phantom_variation_title}
		</p>
		<p class="font-normal text-sm text-near-white text-center">
			({translations[language].variation_max_2})
		</p>
		<div class="flex flex-col gap-y-4 mt-3">
			{#each phantomVariations as option}
				<FloorEffect effect={option} {language} />
			{/each}
		</div>
	</div>
</div>
