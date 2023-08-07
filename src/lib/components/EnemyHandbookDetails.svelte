<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import StatusImmune from './StatusImmune.svelte';
	import HandbookAbilities from './HandbookAbilities.svelte';
	import { getFormTitle } from '$lib/functions/lib';

	export let enemy: Enemy, language: Language, statMods, specialMods;

	const statKeys = ['hp', 'ms', 'atk', 'aspd', 'def', 'res'];
	const enemyLevels = ['NORMAL', 'ELITE', 'BOSS'];

	let formIndex = 0;
</script>

<div id={enemy.key} class="scroll-mt-16">
	<div class="flex gap-x-2">
		{#each enemy.type.filter((ele) => !enemyLevels.includes(ele)) as type}
			<p class="whitespace-nowrap">{translations[language].types[type]}</p>
		{/each}
	</div>
	<div class="flex items-center">
		<p>{enemy.id}</p>
		{#if enemy.overwritten}
			<p>Sp.</p>
		{/if}
		<p>{enemy[`name_${language}`]}</p>
	</div>
	<div class="grid grid-cols-[100px_auto]">
		<div class="flex flex-col gap-y-2">
			<p>ATK type Dmg Element</p>
			<img
				class="select-none"
				src={enemy.img}
				height="75px"
				width="75px"
				decoding="async"
				alt={enemy.id}
			/>
			<div>
				I {translations[language].table_headers.weight}
				{enemy.stats[0].weight}
			</div>
		</div>
		<div>
			{#if enemy.lifepoint !== 1}
				<div class="flex items-center justify-between">
					lifepoint icon {enemy.stats[0].lifepoint}
				</div>
			{/if}
			{#if enemy?.forms}
				<div>
					{#each enemy.forms as form, index}
						<button
							class={`px-2 ${formIndex === index ? 'bg-gray-300' : ''}`}
							on:click={() => (formIndex = index)}
							>{index + 1}{getFormTitle(form.title, index, language)}</button
						>
					{/each}
					<div class="grid grid-cols-2 gap-2">
						{#each statKeys as statKey}
							<div class="flex items-center">
								icon {translations[language].table_headers[statKey]}
								{enemy.stats[formIndex][statKey]}
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="grid grid-cols-2 gap-2">
					{#each statKeys as statKey}
						<div class="flex items-center">
							icon {translations[language].table_headers[statKey]}
							{enemy.stats[formIndex][statKey]}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class="flex flex-col">
		<HandbookAbilities {enemy} {language} {statMods} {specialMods} />
		<StatusImmune {enemy} {specialMods} {language} mode="handbook" />
	</div>
</div>
