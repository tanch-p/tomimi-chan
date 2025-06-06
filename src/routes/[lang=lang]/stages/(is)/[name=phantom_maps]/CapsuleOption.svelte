<script lang="ts">
	import { capsules } from './stores';
	export let capsule, language: string;

	let selected = false;

	capsules.subscribe((list) => {
		selected = Boolean(list.find((ele) => ele.id === capsule.id));
	});

	function handleClick() {
		if (!$capsules.find((ele) => ele.id === capsule.id)) {
			capsules.update((list) => {
				return (list = [...list, capsule]);
			});
		} else {
			capsules.update((list) => (list = list.filter((ele) => ele.id !== capsule.id)));
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={`grid ${
		language === 'en' ? 'grid-cols-[110px_auto]' : 'grid-cols-[100px_auto]'
	} hover:cursor-pointer items-center py-1 ${selected ? 'bg-neutral-700' : 'hover:bg-neutral-700'}`}
	on:click={handleClick}
>
	<!-- <img src={effect.src} alt={effect['name_zh']} loading="lazy" decoding="async" /> -->
	<p class={`text-center ${selected ? 'text-red-400 font-semibold' : ''}`}>
		{capsule[`name_${language}`]}
	</p>
	<div class="flex flex-col">
		<!-- <p class={`${selected ? 'text-red-400 font-semibold' : ''}`}>{effect['name_zh']}</p> -->
		<p>{capsule[`tooltip_${language}`]}</p>
	</div>
</div>
