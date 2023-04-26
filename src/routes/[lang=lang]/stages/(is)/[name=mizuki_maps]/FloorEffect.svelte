<script lang="ts">
	import { activeFloorEffects } from './stores';
	export let effect, language: string;

	let selected = false;

	activeFloorEffects.subscribe((list) => {
		selected = Boolean(list.find((ele) => ele.name_zh === effect.name_zh));
	});

	function handleClick() {
		if (!$activeFloorEffects.find((ele) => ele.name_zh === effect.name_zh)) {
			activeFloorEffects.update((list) => {
				if (list.length === 2) {
					return (list = [list[1], effect]);
				} else {
					return (list = [...list, effect]);
				}
			});
		} else {
			activeFloorEffects.update(
				(list) => (list = list.filter((ele) => ele.name_zh !== effect.name_zh))
			);
		}
	}
</script>

<div
	class={`grid grid-cols-[75px_auto] hover:cursor-pointer ${
		selected ? 'bg-neutral-700' : 'hover:bg-neutral-700'
	}`}
	on:click={handleClick}
>
	<img src={effect.src} alt={effect['name_zh']} loading="lazy" decoding="async" />
	<div class="flex flex-col">
		<p class={`${selected ? 'text-red-400 font-semibold' : ''}`}>{effect['name_zh']}</p>
		<p>{effect['tooltip_zh']}</p>
	</div>
</div>
