<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TogglePanel from './TogglePanel.svelte';
	import { getFormTitle } from '$lib/functions/lib';
	import DraggableContainer from './DraggableContainer.svelte';

	const STATS = [
		{ key: 'hp', displayKey: 'hp' },
		{ key: 'atk', displayKey: 'atk' },
		{ key: 'aspd', displayKey: 'attack_speed' },
		{ key: 'atk_interval', displayKey: 'aspd' },
		{ key: 'range', displayKey: 'range_display' },
		{ key: 'def', displayKey: 'def' },
		{ key: 'res', displayKey: 'res' },
		{ key: 'ms', displayKey: 'ms' }
	];
	const types = ['initial_add', 'initial_multiply', 'final_add', 'final_multiply'];

	export let language: Language, modsCheck, mapConfig;
	let enemyIndex = 0;
	let modIndex = 0;
	let enemy = modsCheck[0];

	$: if (mapConfig || modsCheck) {
		enemyIndex = 0;
	}

	function getValue(mod, stat, idx) {
		if (!mod) {
			return;
		}
		const type = idx < 2 ? 'initial' : 'final';
		if (mod.type !== type) {
			return '-';
		}
		if (stat === 'atk_interval') {
			return idx % 2 === 0 ? mod.mods[stat] ?? '-' : '-';
		}
		if (idx % 2 === 0) {
			return mod.mods[`fixed_${stat}`] || '-';
		}
		if ((mod.mods[stat] ?? 1) === 1) {
			return '-';
		}
		return Math.round(mod.mods[stat] * 100) / 100;
	}
	$: if (enemyIndex > -1) {
		modIndex = 0;
	}
	$: listToShow = modsCheck.filter((enemy) => enemy.modsList.length > 0);
	$: enemy = listToShow[enemyIndex];
</script>

<TogglePanel title={translations[language].mods_check} size="subheading">
	{#if listToShow.length > 0}
	<DraggableContainer className="no-scrollbar">
			<div
				class="flex w-max min-w-full font-bold text-lg text-white text-center select-none py-1 border-b border-b-gray-500"
			>
				{#each listToShow as enemy, i}
					<button on:click={() => (enemyIndex = i)} class="px-1">
						<img
							class="pointer-events-none {i !== enemyIndex ? 'brightness-50' : ''}"
							src={enemy.img}
							height="70px"
							width="70px"
							decoding="async"
							alt={enemy.key}
						/>
					</button>
				{/each}
			</div>
	</DraggableContainer>
		<div class="flex">
			<img
				class="select-none"
				src={enemy.img}
				height="90px"
				width="90px"
				decoding="async"
				alt={enemy.key}
			/>
			<div class="flex flex-col ml-2">
				<div class="flex gap-x-2 mt-1.5 h-[20px]">
					{#each enemy.type.filter((ele) => !['melee', 'ranged','NORMAL'].includes(ele)) as type}
						<p class="whitespace-nowrap text-[#83a39f] text-sm">
							{translations[language].types[type]}
						</p>
					{/each}
				</div>
				<p class="text-2xl">
					{enemy[`name_${language}`] || enemy[`name_zh`]}
				</p>
				{#if enemy.form}
					<p class="text-gray-400">
						{getFormTitle(enemy.form, enemy.formIndex, language)}
					</p>
				{/if}
			</div>
		</div>
		<div class="max-w-[100vw] overflow-auto no-scrollbar">
			<div
				class="flex w-screen sm:w-full overflow-auto no-scrollbar font-bold text-lg text-white text-center select-none divide-x divide-gray-500 py-1"
			>
				{#each enemy.modsList as mod, i}
					<button on:click={() => (modIndex = i)} class="px-2">
						<p class="select-none whitespace-nowrap {i !== modIndex ? 'brightness-50' : ''}">
							{translations[language][mod.key] ?? mod.key}
						</p>
					</button>
				{/each}
			</div>
		</div>
		<div class="max-w-[100vw] overflow-auto no-scrollbar">
			<table class="w-max mt-2">
				<thead>
					<tr>
						<th class="sticky left-0 bg-neutral-800" />
						{#each STATS as { displayKey }}
							<th class="px-2">
								{translations[language].table_headers[displayKey]}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each types as type, idx}
						<tr>
							<th scope="row" class="py-1.5 pl-1.5 pr-2.5 sticky left-0 bg-neutral-800 text-right"
								>{translations[language][type]}</th
							>
							{#each STATS as { key }}
								{@const value = getValue(enemy.modsList[modIndex], key, idx)}

								<td class:text-gray-500={value === '-'} class="text-center">{value}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		「」
	{/if}
</TogglePanel>
