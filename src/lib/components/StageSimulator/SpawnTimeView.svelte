<script lang="ts">
	import type { Language } from '$lib/types';
	import { Game } from './objects/Game';
	import { GameConfig } from './objects/GameConfig';
	import { page } from '$app/stores';
	import { wavePrefixSuffix } from '$lib/functions/languageHelpers';
	import { onDestroy, onMount } from 'svelte';
	import translations from '$lib/translations.json';
	import { compileSpawnTimeActions } from '$lib/functions/waveHelpers';

	export let game: Game, waves, mapConfig;

	let timelineContainer: HTMLDivElement, actionsContainer: HTMLDivElement;
	let currWaveIndex = 0;
	let index = 0;
	let language: Language;
	let showTimeline = true;
	let timeline = waves?.[currWaveIndex]?.timeline;

	$: language = $page.data.language;
	$: GameConfig.showTimeline.subscribe((v) => (showTimeline = v));

	// Sync class -> store
	let unsubscribe;
	onMount(() => {
		unsubscribe = GameConfig.subscribe('waveElapsedTime', (value) => {
			trackAndScrollContainer(value);
		});
	});

	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});

	function trackAndScrollContainer(waveElapsedTime: number) {
		if (timelineContainer && timeline) {
			if (waveElapsedTime > timeline?.[0]?.t) {
				timelineContainer.scrollBy({
					top: actionsContainer.children[index].scrollHeight + 16, // +16 for mt-4
					behavior: 'smooth'
				});
				index += 1;
				timeline.shift();
			}
			if (timeline.length === 0) {
				currWaveIndex += 1;
				timeline = waves?.[currWaveIndex]?.timeline;
				timelineContainer.scrollBy({
					top: actionsContainer.children[index].scrollHeight + 16,
					behavior: 'smooth'
				});
				index += 1;
			}
		}
	}
</script>

<div class="absolute w-[180px] h-full p-4 {showTimeline ? '' : 'opacity-0 pointer-events-none'}">
	<div bind:this={timelineContainer} class="w-full h-full overflow-y-scroll no-scrollbar">
		<div bind:this={actionsContainer} class="pb-[100vh]">
			{#each waves as { maxTimeWaitingForNextWave, timeline }, i}
				{#if i > 0 && timeline.length > 0}<p class="mt-4">
						{wavePrefixSuffix(i + 1, language)}
					</p>{/if}
				{#each timeline as { t, actions }}
					{@const min = Math.floor(t / 60)}
					{@const sec = Math.floor(t % 60)}
					{@const compiledActions = compileSpawnTimeActions(actions)}
					<div class="grid grid-cols-[40px_1fr] gap-x-2 mt-4">
						<p class="text-center mt-[15px]">
							{min}:{#if sec < 10}0{/if}{sec}
						</p>
						<div class="flex flex-wrap">
							{#each compiledActions as { key, count }}
								{#if !key.includes('trap') && key !== ''}
									{@const prefabKey = mapConfig.enemies.find(
										(enemy) => enemy.id === key
									)?.prefabKey}
									<div class="relative">
										{#if count > 1}
											<p class="absolute right-0 bottom-0 bg-almost-black px-1 text-xs">
												x{count}
											</p>
										{/if}
										<img
											src="/images/enemy_icons/{prefabKey}.webp"
											width="50px"
											height="50px"
											alt={key}
											class=""
										/>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
				{#if timeline?.length > 0}
					<div class="text-center mt-4">
						{#if maxTimeWaitingForNextWave > 0}
							<p>{translations[language].max_wait_time}: {maxTimeWaitingForNextWave}<br />OR</p>
						{/if}

						{translations[language].all_enemies_defeated}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
