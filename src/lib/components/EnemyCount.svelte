<script lang="ts">
	import type { MapConfig, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TogglePanel from './TogglePanel.svelte';
	import { BONUS_ENEMY_KEYS } from '$lib/functions/lib';

	export let mapConfig: MapConfig, enemies, eliteMode: boolean, language: Language;

	function getMinMaxCount(id, eliteMode) {
		const data = mapConfig.enemies.find((enemy) => id === enemy.id);
		if (data) {
			return eliteMode
				? {
						min: data.elite_min_count,
						max: data.elite_max_count
				  }
				: { min: data.min_count, max: data.max_count };
		}
		return { min: 0, max: 0 };
	}
	function getTotalCountStr(mapConfig, eliteMode) {
		const data = eliteMode ? mapConfig.e_count ?? mapConfig.n_count : mapConfig.n_count;
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
	title={translations[language].enemy_count + ` (${getTotalCountStr(mapConfig, eliteMode)})`}
	isOpen={true}
	size="subheading"
	className="my-4"
>
	<div class="flex flex-wrap gap-x-4 gap-y-2 px-2.5 md:px-0">
		{#each enemies as enemy}
			{#if !((mapConfig.id.includes('_n_') || mapConfig.id.includes('_e_')) && BONUS_ENEMY_KEYS.includes(enemy.key))}
				{@const { min, max } = getMinMaxCount(enemy.stageId, eliteMode)}
				<a href="#{enemy.stageId}" class="relative flex items-center hover:bg-neutral-700">
					<img
						class="select-none w-[55px] md:w-[65px]"
						src={`/images/enemy_icons/${enemy.key}.webp`}
						height="65"
						width="65"
						decoding="async"
						alt={enemy.id}
						title={enemy[`name_${language}`] || enemy[`name_zh`]}
					/>
					<p
						class="flex md:hidden absolute right-[-3px] bottom-[-3px] bg-almost-black px-1 text-xs"
					>
						x&nbsp;
						{#if min === max}
							<span>{min ?? 0}</span>
						{:else}
							<span>{min}</span>
							<span>~</span>
							<span>{max}</span>
						{/if}
					</p>
					<p class="hidden md:block">
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
