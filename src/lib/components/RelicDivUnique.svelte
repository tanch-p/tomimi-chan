<script lang="ts">
	export let relic, language: string, rogueTopic: string, selectedUniqueRelic;

	const src = `https://res.cloudinary.com/dbqz7mebk/image/upload/v1681056192/tomimi.dev/relics/${relic.img}.webp`;
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
		<p class={`text-lg sm:text-xl ${selected ? 'text-[#cea658]' : 'text-gray-400'}`}>{name}</p>
		<p class="text-[#c4c4c4]">{tooltip}</p>
	</div>
</div>
