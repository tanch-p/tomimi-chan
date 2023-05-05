<script lang="ts">
	export let relic, language: string, rogueTopic: string, selectedRelics;

	const src = `https://res.cloudinary.com/dbqz7mebk/image/upload/v1681056192/tomimi.dev/relics/${relic.img}.webp`;
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
				return 'text-[#58dbda]';
			case 'rogue_phantom':
				return 'text-[#cea658]';
			default:
				return '';
		}
	}
</script>

<div
	class={`grid grid-cols-[75px_auto] sm:grid-cols-[95px_auto] gap-x-2 ${
		selected ? 'bg-neutral-800' : 'hover:bg-neutral-700'
	}`}
	on:click={handleClick}
>
	<div>
		<img {src} alt={name} loading="lazy" decoding="async" />
	</div>
	<div class="px-2">
		<p
			class={`text-lg sm:text-xl ${selected ? getSelectedTextColor(rogueTopic) : 'text-gray-400'}`}
		>
			{name}
		</p>
		<p class="text-[#c4c4c4]">{tooltip}</p>
	</div>
</div>
