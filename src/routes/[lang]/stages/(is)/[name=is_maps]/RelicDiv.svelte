<script lang="ts">
	import { selectedRelics } from './stores.js';
	export let relic, language: string;
	const { src } = relic;
	const name = relic[`name_${language}`] || relic[`name_zh`];
	const tooltip = relic[`tooltip_${language}`] || relic[`tooltip_zh`];

	let selected = false;

	selectedRelics.subscribe((list) => {
		selected = Boolean(list.find((item) => item.id === relic.id));
	});

	function handleClick() {
		if (!$selectedRelics.find((item) => item.id === relic.id)) {
			selectedRelics.update((list) => (list = [...list, relic]));
		} else {
			selectedRelics.update((list) => (list = list.filter((item) => item.id !== relic.id)));
		}
	}
</script>

<div
	class={`grid grid-cols-[75px_auto] sm:grid-cols-[95px_auto] gap-x-2 ${selected ? "bg-neutral-800" : "hover:bg-neutral-700"}`}
	on:click={handleClick}
>
	<div>
		<img {src} alt={relic.name_zh} />
	</div>
	<div class="px-2">
		<p class={`text-lg sm:text-xl ${selected ? 'text-[#58dbda]' : 'text-gray-400'}`}>{name}</p>
		<p class="text-[#c4c4c4]">{tooltip}</p>
	</div>
</div>
