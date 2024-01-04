<script lang="ts">
	import type { Language } from '$lib/types';
	import { activeChaosEffects } from './stores';
	export let effect, language: Language;

	let selected = false;

	activeChaosEffects.subscribe((list) => {
		selected = Boolean(list.find((ele) => ele.id === effect.id));
	});

	function handleClick() {
		if (!$activeChaosEffects.find((ele) => ele.id === effect.id)) {
			activeChaosEffects.update((list) => [effect]);
		} else {
			activeChaosEffects.update((list) => (list = list.filter((ele) => ele.id !== effect.id)));
		}
	}
	$: name = effect[`outerName_${language}`] || effect[`outerName_zh`];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={`grid grid-cols-[75px_auto] gap-x-2 hover:cursor-pointer ${
		selected ? 'bg-neutral-700' : 'hover:bg-neutral-700'
	}`}
	on:click={handleClick}
>
	<span class="flex items-center justify-center">
		<img src={effect.src} alt={name} loading="lazy" decoding="async" /></span
	>
	<div class="flex flex-col">
		<p class={`${selected ? 'text-purple-400 font-semibold' : ''}`}>{name}</p>
		<p>{effect[`tooltip_${language}`]}</p>
	</div>
</div>
