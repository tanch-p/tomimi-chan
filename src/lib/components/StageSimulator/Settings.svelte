<script lang="ts">
	import type { Language } from '$lib/types';
	import { GameConfig } from './objects/GameConfig';
	import { page } from '$app/stores';
	import { Game } from './objects/Game';

	export let game: Game;
	let language: Language;
	$: language = $page.data.language;

	let showTimeline = true;

	const options = [
		{
			key: 'showAllRange',
			type: 'key',
			texts: {
				zh: '显示攻击范围',
				ja: '攻撃範囲表示',
				en: 'Show Attack Range'
			},
			fn: (key) => {
				GameConfig[key] = !GameConfig[key];
				game.gameManager.enemiesOnMap
					.filter((enemy) => enemy.alive)
					.forEach((enemy) => {
						if (enemy.atkRangeMesh) {
							enemy.atkRangeMesh.visible = GameConfig.showAllRange;
						}
						enemy.skillRangeMeshes.forEach((mesh) => (mesh.visible = GameConfig.showAllRange));
					});
			}
		},
		{
			key: 'showAllTimers',
			type: 'key',
			texts: { zh: '显示待机倒数', ja: '待機残り時間表示', en: 'Show Wait Timer' },
			fn: (key) => {
				GameConfig[key] = !GameConfig[key];
				game.gameManager.enemiesOnMap
					.filter((enemy) => enemy.alive)
					.forEach((enemy) => {
						enemy.waitTimer.getMesh().visible =
							enemy.waitElapsedTime > 0 && GameConfig.showAllTimers;
					});
			}
		},
		{
			key: 'showTimeline',
			type: 'store',
			texts: { zh: '显示出怪顺序', ja: '敵出現表表示', en: 'Show Enemy Spawn Timeline' },
			fn: () => {
				GameConfig.showTimeline.update((v) => !v);
			}
		}
	];
	GameConfig.showTimeline.subscribe((v) => (showTimeline = v));

	$: lookup = { showTimeline };
</script>

<div class="flex flex-wrap justify-end gap-4 py-4">
	{#each options as { key, texts, type, fn }}
		{@const value = type === 'store' ? lookup[key] : GameConfig[key]}
		<button
			class="grid grid-cols-[1fr_14px] gap-x-1 rounded-sm bg-gray-500 hover:bg-gray-600 px-2 py-1.5"
			on:click={() => fn(key)}
		>
			<span>{texts[language]}: </span>
			<span>{value ? '○' : '✕'}</span>
		</button>
	{/each}
</div>
