<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import boss_icon from '$lib/images/is/boss_icon.webp';
	import combat_ops_icon from '$lib/images/is/combat_icon.webp';
	import emergency_ops_icon from '$lib/images/is/emergency_icon.webp';
	import lumen from '$lib/images/is/lumen.webp';
	import chest from '$lib/images/is/mizuki/chest.webp';
	import translations from '$lib/translations.json';

	export let routes: [], rogueTopic: RogueTopic | null, language: Language;

	const icons = [
		{ title: 'duck', src: '/images/enemy_icons/enemy_2001_duckmi.webp' },
		{ title: 'gpn', src: '/images/enemy_icons/enemy_2002_bearmi.webp' },
		{ title: 'thf', src: `/images/enemy_icons/enemy_2034_sythef.webp` },
		{ title: 'doq', src: `/images/enemy_icons/enemy_2038_sydonq.webp` },
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
	$: folder = rogueTopic?.replace('rogue_', '');
	$: show = language !== 'zh' || routes[0].bilibili_src;
</script>

{#if show}
	<div class="">
		{#if routes.length > 1}
			<ul
				class="flex w-screen sm:w-full overflow-auto no-scrollbar font-bold text-lg text-near-white text-center select-none divide-x divide-gray-500 py-1"
			>
				{#each routes as route, index}
					{@const icon = icons.find((ele) => ele.title === route.title)}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
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
	</div>
{/if}
