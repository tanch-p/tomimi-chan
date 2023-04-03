<script lang="ts">
	import DLD from '$lib/images/enemy_icons/enemy_2001_duckmi.webp';
	import GPN from '$lib/images/enemy_icons/enemy_2002_bearmi.webp';
	import THF from '$lib/images/enemy_icons/enemy_2034_sythef.webp';
	import DOQ from '$lib/images/enemy_icons/enemy_2038_sydonq.webp';
	import boss_icon from '$lib/images/is/boss_icon.webp';
	import combat_ops_icon from '$lib/images/is/combat_icon.webp';
	import emergency_ops_icon from '$lib/images/is/emergency_icon.webp';
	import lumen from '$lib/images/is/lumen.webp';
	import translations from '$lib/translations.json';
	import VideoPlayer, { stopAll } from './VideoPlayer.svelte';

	export let routes: [], language: string;

	const icons = [
		{ title: 'duck', src: DLD },
		{ title: 'gpn', src: GPN },
		{ title: 'thf', src: THF },
		{ title: 'doq', src: DOQ },
		{ title: 'lumen', src: lumen },
		{ title: 'boss', src: boss_icon },
		{ title: 'combat_ops', src: combat_ops_icon },
		{ title: 'emergency_ops', src: emergency_ops_icon, width: 55, height: 55 }
	];

	let selected = 0;
	$: if (routes) {
		selected = 0;
	}

	$: if (selected) {
		stopAll();
	}
</script>

<div class="sm:max-w-[40rem] mx-auto">
	{#if routes.length > 1}
		<ul class="flex font-bold text-lg text-white text-center select-none divide-x divide-gray-500">
			{#each routes as route, index}
				{@const icon = icons.find((ele) => ele.title === route.title)}
				<li
					class={`w-full cursor-pointer flex items-center justify-center py-1.5`}
					on:click={() => (selected = index)}
				>
					{#if icon}
						<img
							src={icon.src}
							height={icon.height ?? 50}
							width={icon.width ?? 50}
							alt={icon.title}
							class={`${selected !== index ? 'opacity-30' : ''}`}
						/>
					{:else}
						<span
							class={`inline-block p-3 w-full  active focus:outline-none ${
								selected !== index ? 'opacity-30' : ''
							}`}
						>
							{translations[language][route.title]}
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
	{#each routes as route, index}
		<div class={`${selected !== index ? 'invisible pointer-events-none h-0 w-0' : ''}`}>
			{#if route.title === 'doq'}
				<img
					src={`https://res.cloudinary.com/dbqz7mebk/image/upload/v1680366257/tomimi.dev/mizuki/doq/${route.id}.webp`}
					alt={route.title}
					class="aspect-[1062/600] w-screen max-h-max sm:aspect-auto sm:w-[40rem] sm:h-[360px]"
				/>
			{:else}
				<VideoPlayer {route} />
			{/if}
		</div>
	{/each}
</div>
