<script lang="ts">
	import type { MapConfig, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TogglePanel from './TogglePanel.svelte';
	import { BONUS_ENEMY_KEYS } from '$lib/functions/lib';

	export let mapConfig: MapConfig, enemies, eliteMods, language: Language;

	function getMinMaxCount(id, eliteMods) {
		const data = mapConfig.enemies.find((enemy) => id === enemy.id);
		if (data) {
			return eliteMods
				? {
						min: data.elite_min_count,
						max: data.elite_max_count
				  }
				: { min: data.min_count, max: data.max_count };
		}
		return { min: 0, max: 0 };
	}
	function getTotalCountStr(mapConfig, eliteMods) {
		const data = eliteMods ? mapConfig.e_count ?? mapConfig.n_count : mapConfig.n_count;
		const lastIndex = data.length - 1;
		let min = data[0];
		let max = data[lastIndex];
		if (min === max) {
			return min;
		}
		return `${min} ~ ${max}`;
	}
</script>

<TogglePanel
	title={translations[language].enemy_count + ` (${getTotalCountStr(mapConfig, eliteMods)})`}
	isOpen={true}
	size="subheading"
	className="my-4"
>
	<div class="flex flex-wrap gap-x-3 gap-y-2 px-2.5 md:px-0">
		{#each enemies as enemy}
			{#if mapConfig.id.includes('t') || mapConfig.id.includes('ev') || mapConfig.id.includes('duel') ? true : !BONUS_ENEMY_KEYS.includes(enemy.key)}
				{@const { min, max } = getMinMaxCount(enemy.stageId, eliteMods)}
				<a href="#{enemy.stageId}" class="flex items-center pr-1.5 hover:bg-neutral-700">
					<img
						class="select-none"
						src={enemy.img}
						height="65"
						width="65"
						decoding="async"
						alt={enemy.id}
						title={enemy[`name_${language}`] || enemy[`name_zh`]}
					/>
					<p>
						<span class="text-xl ml-2">x</span>
						{#if min === max}
							<span>{min ?? 0}</span>
						{:else}
							<span>{min}</span>
							<span>~</span>
							<span>{max}</span>
						{/if}
					</p>
				</a>
			{/if}
		{/each}
	</div>
</TogglePanel>
