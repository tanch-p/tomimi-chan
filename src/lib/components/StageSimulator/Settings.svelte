<script lang="ts">
	import type { Language } from '$lib/types';
	import { GameConfig } from './objects/GameConfig';
	import { page } from '$app/stores';

	let language: Language;

	$: language = $page.data.language;

	const options = [
		{
			key: 'showAllRange',
			texts: {
				zh: '显示攻击范围',
				ja: '攻撃範囲表示',
				en: 'Show Attack Range'
			}
		},
		{
			key: 'showAllTimers',
			texts: { zh: '显示待机倒数', ja: '待機残り時間表示', en: 'Show Wait Timer' }
		},
		{
			key: 'showTimeline',
			texts: { zh: '显示出怪顺序', ja: '敵出現表表示', en: 'Show Enemy Spawn Timeline' }
		}
	];
</script>

<div class="flex flex-wrap justify-end gap-4 py-4">
	{#each options as { key, texts }}
		<button
			class="grid grid-cols-[1fr_14px] gap-x-1 rounded-sm bg-gray-500 hover:bg-gray-600 px-2 py-1.5"
			on:click={() => (GameConfig[key] = !GameConfig[key])}
		>
			<span>{texts[language]}: </span>
			<span>{GameConfig[key] ? '○' : '✕'}</span>
		</button>
	{/each}
</div>
