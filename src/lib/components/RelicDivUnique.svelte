<script lang="ts">
	import type { Language } from '$lib/types';
	import { relicLookup } from '$lib/data/is/relic_lookup';
	import TextParser from './TextParser.svelte';
	export let relic, language: Language, selectedUniqueRelic;

	$: name = relic[`name_${language}`] || relic[`name_zh`];
	$: tooltip = relic[`tooltip_${language}`] || relic[`tooltip_zh`];

	let selected = false;
	relic.count = relic?.count || 0;

	selectedUniqueRelic.subscribe((item) => {
		if (item) {
			selected = item.id === relic.id;
		} else {
			selected = false;
		}
	});

	function handleClick() {
		if (relic.stages) {
			if (selected) {
				relic.count++;
				if (relic.count > relic.stages?.length - 1) {
					relic.count = 0;
					selectedUniqueRelic.set(null);
				} else {
					selectedUniqueRelic.set(relic);
				}
			} else {
				relic.count = 0;
				selectedUniqueRelic.set(relic);
			}
			return;
		}
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
	<img
		src="/images/relics/{relicLookup[relic.id]}.webp"
		alt={name}
		loading="lazy"
		decoding="async"
		class="relic"
	/>
	<div class="relic px-2">
		<p class={`relic text-lg sm:text-xl ${selected ? 'text-[#cea658]' : 'text-gray-400'}`}>
			{name}
			{#if selected && relic.stages && relic?.stages?.[relic?.count]?.suffix}
				({relic?.stages?.[relic?.count]?.suffix})
			{/if}
		</p>
		<TextParser line={tooltip} className="relic text-[#c4c4c4]" />
	</div>
</div>
