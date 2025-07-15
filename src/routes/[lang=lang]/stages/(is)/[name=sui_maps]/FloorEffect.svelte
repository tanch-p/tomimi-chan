<script lang="ts">
	import type { Language } from '$lib/types';
	import { activeFloorEffects } from './stores';

	export let effect, language: Language;

	let selected = false;

	activeFloorEffects.subscribe((list) => {
		selected = Boolean(list.find((ele) => ele.id === effect.id));
	});

	function handleClick() {
		if (!$activeFloorEffects.find((ele) => ele.id === effect.id)) {
			activeFloorEffects.update((list) => {
				if (list.length === 2) {
					return (list = [list[1], effect]);
				} else {
					return (list = [...list, effect]);
				}
			});
		} else {
			activeFloorEffects.update((list) => (list = list.filter((ele) => ele.id !== effect.id)));
		}
	}
	$: name = effect[`name_${language}`] || effect[`name_zh`];
</script>

<button
	id={effect.iconId}
	class={`grid grid-cols-[75px_auto] gap-x-2 text-start ${
		selected ? 'bg-neutral-700' : 'hover:bg-neutral-700'
	}`}
	on:click={handleClick}
>
	<span class="flex items-center justify-center">
		<img src={effect.src} alt={name} loading="lazy" decoding="async" class="invert" />
	</span>
	<div class="flex flex-col">
		<p class={`${selected ? 'text-[#ff382e] font-semibold' : ''}`}>
			{name}
		</p>
		<p>{effect[`tooltip_${language}`] || effect[`tooltip_zh`]}</p>
	</div>
</button>
