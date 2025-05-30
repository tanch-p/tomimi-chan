<script lang="ts">
	import type { Language } from '$lib/types';
	import { disasterEffects } from './stores';
	import disaster_1 from '$lib/images/is/sarkaz/rogue_4_disaster_1_toast.webp';
	import disaster_2 from '$lib/images/is/sarkaz/rogue_4_disaster_2_toast.webp';
	import disaster_5 from '$lib/images/is/sarkaz/rogue_4_disaster_5_toast.webp';
	export let effect, language: Language;

	const lookup = {
		rogue_4_disaster_1: disaster_1,
		rogue_4_disaster_2: disaster_2,
		rogue_4_disaster_5: disaster_5
	};

	let selected = false;

	disasterEffects.subscribe((list) => {
		selected = Boolean(list.find((ele) => ele.id === effect.id));
	});

	function handleClick() {
		if (!$disasterEffects.find((ele) => ele.id === effect.id)) {
			disasterEffects.set([effect]);
		} else {
			disasterEffects.set([]);
		}
	}
	$: name = effect[`name_${language}`] || effect[`name_zh`];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
	id={effect.iconId}
	class={`grid grid-cols-[75px_auto] gap-x-2 text-start ${
		selected ? 'bg-neutral-700' : 'hover:bg-neutral-700'
	}`}
	on:click={handleClick}
>
	<span class="flex items-center justify-center">
		<img src={lookup[effect.iconId]} alt={name} loading="lazy" decoding="async" class="invert" />
	</span>
	<div class="flex flex-col">
		<p class={`${selected ? 'text-[#ff382e] font-semibold' : ''}`}>
			{name}
		</p>
		<p>{effect[`tooltip_${language}`] || effect[`tooltip_zh`]}</p>
	</div>
</button>
