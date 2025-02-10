<script lang="ts">
	import type { Language } from '$lib/types';
	import { Game } from './objects/Game';
	import { GameConfig } from './objects/GameConfig';
	import { page } from '$app/stores';
	import { wavePrefixSuffix } from '$lib/functions/languageHelpers';

	export let game: Game, waves,mapConfig;

	let timelineContainer: HTMLDivElement, actionsContainer: HTMLDivElement;
	let waveElapsedTime: number, scaledElapsedTime: number;
	let prevActionIndex = 0,
		currWaveIndex = 0;
	let index = 0;
	let language: Language;
	let showTimeline = true;

	$: language = $page.data.language;

	game.gameManager.scaledElapsedTime.subscribe((v) => {
		scaledElapsedTime = v;
		waveElapsedTime = game.gameManager.waveElapsedTime;
	});

	function trackAndScrollContainer(val: number) {
		if (timelineContainer) {
			const waveIndex = game.spawnManager.currentWaveIndex;
			const actionIndex = game.spawnManager.actionIndex;
			if (actionIndex > prevActionIndex) {
				prevActionIndex = actionIndex;
				timelineContainer.scrollBy({
					top: actionsContainer.children[index].scrollHeight + 16, // +16 for mt-4
					behavior: 'smooth'
				});
				index += 1;
			}
			if (waveIndex > currWaveIndex) {
				currWaveIndex = waveIndex;
				prevActionIndex = 0;
				timelineContainer.scrollBy({
					top: actionsContainer.children[index].scrollHeight + 16,
					behavior: 'smooth'
				});
				index += 1;
			}
		}
	}
	$: trackAndScrollContainer(waveElapsedTime);
	$: GameConfig.showTimeline.subscribe((v) => (showTimeline = v));
</script>

<div class="absolute w-64 h-full p-4 {showTimeline ? '' : 'opacity-0 pointer-events-none'}">
	<div bind:this={timelineContainer} class="w-full h-full overflow-y-scroll no-scrollbar">
		<div bind:this={actionsContainer} class="pb-[100vh]">
			{#each waves as { maxTimeWaitingForNextWave, postDelay, preDelay, timeline }, i}
				{#if i > 0 && timeline.length > 0}<p class="mt-4">
						{wavePrefixSuffix(i + 1, language)}
					</p>{/if}
				{#each timeline as { t, actions }}
					{@const min = Math.floor(t / 60)}
					{@const sec = Math.floor(t % 60)}
					<div class="grid grid-cols-[40px_1fr] gap-x-2 pl-2 mt-4">
						<p class="text-center mt-[15px]">
							{min}:{#if sec < 10}0{/if}{sec}
						</p>
						<div class="flex flex-wrap">
							{#each actions as { key }}
								{@const prefabKey = mapConfig.enemies.find(enemy => enemy.id === key)?.prefabKey}
								<img
									src="/images/enemy_icons/{prefabKey}.webp"
									width="50px"
									height="50px"
									alt={key}
									class=""
								/>
							{/each}
						</div>
					</div>
				{/each}
				<p>maxTime: {maxTimeWaitingForNextWave}</p>
				<p>postDelay: {postDelay}</p>
				<p>preDelay: {preDelay}</p>
			{/each}
		</div>
	</div>
</div>
