<script lang="ts">
	import type { Language } from '$lib/types';
	import { activeChaosEffects } from './stores';
	export let effect, language: Language;

	let selected = false;

	activeChaosEffects.subscribe((list) => {
		selected = Boolean(list.find((ele) => ele.id === effect.id));
	});

	function handleClick() {
		if ($activeChaosEffects.find((ele) => ele.id === effect.id)) {
			//same id
			return activeChaosEffects.update(
				(list) => (list = list.filter((ele) => ele.id !== effect.id))
			);
		}
		if ($activeChaosEffects.find((ele) => ele.shared_id === effect.shared_id)) {
			return activeChaosEffects.update((list) => {
				list = list.filter((ele) => ele.shared_id !== effect.shared_id);
				list = [...list, effect];
				return list;
			});
		}
		activeChaosEffects.update((list) => {
			return (list = [...list, effect]);
		});
	}
	$: name = effect[`outerName_${language}`] || effect[`outerName_zh`];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
	class={`grid grid-cols-[75px_auto] gap-x-2 text-start ${
		selected ? 'bg-neutral-700' : 'hover:bg-neutral-700'
	}`}
	on:click={handleClick}
>
	<span class="flex items-center justify-center">
		<img src={effect.src} alt={name} loading="lazy" decoding="async" class="" />
	</span>
	<div class="flex flex-col">
		<p class={`${selected ? 'text-purple-400 font-semibold' : ''}`}>{name}</p>
		<p>{effect[`tooltip_${language}`]}</p>
	</div>
</button>
