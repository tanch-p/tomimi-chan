<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import { relicLookup } from '$lib/data/relic_lookup';
	export let relic, language: Language, rogueTopic: RogueTopic, selectedUniqueRelic;

	$: name = relic[`name_${language}`] || relic[`name_zh`];
	$: tooltip = relic[`tooltip_${language}`] || relic[`tooltip_zh`];

	let selected = false;

	selectedUniqueRelic.subscribe((item) => {
		if (item) {
			selected = item.id === relic.id;
		} else {
			selected = false;
		}
	});

	function handleClick() {
		if (selected) {
			selectedUniqueRelic.set(null);
		} else {
			selectedUniqueRelic.set(relic);
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={`relic grid grid-cols-[75px_auto] sm:grid-cols-[95px_auto] gap-x-2 ${
		selected ? 'bg-neutral-800' : 'hover:bg-neutral-700'
	}`}
	on:click={handleClick}
>
	<img src={relicLookup[relic.id]} alt={name} loading="lazy" decoding="async" class="relic" />
	<div class="relic px-2">
		<p class={`relic text-lg sm:text-xl ${selected ? 'text-[#cea658]' : 'text-gray-400'}`}>{name}</p>
		<p class="relic text-[#c4c4c4]">{tooltip}</p>
	</div>
</div>
