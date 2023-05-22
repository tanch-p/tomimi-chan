<script lang="ts">
	import DLD from '$lib/images/enemy_icons/enemy_2001_duckmi.webp';
	import GPN from '$lib/images/enemy_icons/enemy_2002_bearmi.webp';
	import THF from '$lib/images/enemy_icons/enemy_2034_sythef.webp';
	import DOQ from '$lib/images/enemy_icons/enemy_2038_sydonq.webp';
	import boss_icon from '$lib/images/is/boss_icon.webp';
	import combat_ops_icon from '$lib/images/is/combat_icon.webp';
	import emergency_ops_icon from '$lib/images/is/emergency_icon.webp';
	import lumen from '$lib/images/is/lumen.webp';
	import chest from '$lib/images/is/mizuki/chest.webp';
	import translations from '$lib/translations.json';
	import VideoPlayer, { stopAll } from './VideoPlayer.svelte';

	export let routes: [], language: string;

	const icons = [
		{ title: 'duck', src: DLD },
		{ title: 'gpn', src: GPN },
		{ title: 'thf', src: THF },
		{ title: 'doq', src: DOQ },
		{ title: 'chest', src: chest },
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
		if (language !== 'zh') {
			stopAll();
		}
	}
</script>

<div class="">
	{#if routes.length > 1}
		<ul
			class="flex w-screen sm:w-full overflow-auto no-scrollbar font-bold text-lg text-white text-center select-none divide-x divide-gray-500 py-1"
		>
			{#each routes as route, index}
				{@const icon = icons.find((ele) => ele.title === route.title)}
				<li
					class={`flex items-center justify-center min-w-[75px] w-full cursor-pointer py-1.5`}
					on:click={() => (selected = index)}
				>
					{#if icon}
						<img
							src={icon.src}
							height={icon.height ?? 50}
							width={icon.width ?? 50}
							alt={icon.title}
							loading="lazy"
							decoding="async"
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
			{#if route.type === 'img'}
				<img
					srcset="https://res.cloudinary.com/dbqz7mebk/image/upload/c_fit,w_400/v1680366257/tomimi.dev/mizuki/{route.title}/{route.src}.webp 400w, 
					https://res.cloudinary.com/dbqz7mebk/image/upload/c_fit,w_640/v1680366257/tomimi.dev/mizuki/{route.title}/{route.src}.webp 600w"
					sizes="(max-width: 480px) 400px, 600px"
					src={`https://res.cloudinary.com/dbqz7mebk/image/upload/c_fit,w_640/v1680366257/tomimi.dev/mizuki/${route.title}/${route.src}.webp`}
					alt={'doq'}
					loading="lazy"
					decoding="async"
					class="aspect-[1062/600] w-screen max-h-max sm:aspect-auto sm:w-[40rem] sm:h-[360px]"
				/>
			{:else}
				<VideoPlayer {route} {language} />
			{/if}
		</div>
	{/each}
</div>
