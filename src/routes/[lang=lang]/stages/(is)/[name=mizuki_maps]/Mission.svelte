<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import { missionMods } from './stores.js';

	const missionModEffects = [
		{
			targets: ['ALL'],
			mods: {
				atk: 1.3,
				hp: 1.3
			}
		}
	];
	let selected = false;

	$: selected ? missionMods.set(missionModEffects) : missionMods.set(null);

	export let language: Language;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={`max-w-screen sm:w-max sm:px-6 mt-4 mb-6 select-none hover:cursor-pointer hover:bg-neutral-700`}
	on:click={() => {
		selected = !selected;
	}}
>
	<p class="px-2 sm:px-0 text-subheading">{translations[language].mizuki_mission}</p>
	<hr class="border-gray-500 my-1" />
	<div class="px-2 sm:px-0 flex gap-x-1.5 sm:items-center mt-1.5">
		<input type="checkbox" class="accent-red-500 w-4 h-4 mt-1 sm:mt-0" checked={selected} />
		{translations[language].mizuki_mission_text}
	</div>
</div>
