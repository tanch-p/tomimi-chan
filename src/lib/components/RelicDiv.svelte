<script lang="ts">
	import type {Language} from "$lib/types"
	export let relic, language: Language, rogueTopic: string, selectedRelics;

	const src = `https://res.cloudinary.com/dbqz7mebk/image/upload/c_fit,w_100/v1681056192/tomimi.dev/relics/${relic.img}.webp`;
	$: name = relic[`name_${language}`] || relic[`name_zh`];
	$: tooltip = relic[`tooltip_${language}`] || relic[`tooltip_zh`];

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
	function getSelectedTextColor(rogueTopic: string) {
		switch (rogueTopic) {
			case 'rogue_mizuki':
			case 'rogue_sami':
				return 'text-[#58dbda]';
			case 'rogue_phantom':
				return 'text-[#cea658]';
			default:
				return '';
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id={`relic_${name}`}
	class={`relic grid grid-cols-[75px_auto] sm:grid-cols-[95px_auto] gap-x-2 ${
		selected ? 'bg-neutral-800' : 'hover:bg-neutral-700'
	}`}
	on:click={handleClick}
>
	<img {src} alt={name} loading="lazy" decoding="async" class="relic w-[75px] sm:w-[95px]" />
	<div class="relic px-2">
		<p
			class={`relic text-lg sm:text-xl ${selected ? getSelectedTextColor(rogueTopic) : 'text-gray-400'}`}
		>
			{name}
		</p>
		<p class="relic text-[#c4c4c4]">{tooltip}</p>
	</div>
</div>
