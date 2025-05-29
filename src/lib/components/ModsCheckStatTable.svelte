<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import DraggableContainer from './DraggableContainer.svelte';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import aspdIcon from '$lib/images/is/aspd.webp';
	import msIcon from '$lib/images/is/movespeed.webp';
	import { relicLookup } from '$lib/data/is/relic_lookup';

	const STATS_KEY_TABLE = {
		hp: 'hp',
		atk: 'atk',
		aspd: 'attack_speed',
		atk_interval: 'aspd',
		def: 'def',
		res: 'res',
		ms: 'ms'
	};

	export let language: Language, enemy: Enemy, formIndex: number;

	let statIndex = 0;

	$: if (formIndex > -1 || enemy) {
		statIndex = 0;
	}

	$: statsToShow = enemy.modsList[formIndex].reduce((acc, curr) => {
		for (const mod of curr.mods) {
			if (mod.key === 'dmg_res') continue;
			if (!acc.includes(mod.key)) {
				acc.push(mod.key);
			}
		}
		return acc;
	}, []);

	$: statKey = statsToShow[statIndex];

	$: runeMods = getRunes(enemy.modsList[formIndex], statKey);

	$: otherMods = getOtherMods(enemy.modsList[formIndex], statKey);

	function getRunes(modsList, statKey) {
		const list = [];
		const runes = modsList.find((mod) => ['combat_ops', 'elite_ops'].includes(mod.key));
		if (runes) {
			for (const mod of runes.mods) {
				if (mod.key === statKey) {
					list.push(mod);
				}
			}
		}
		return list;
	}
	function getOtherMods(modsList, statKey) {
		const initialAdd = [];
		const initialMul = [];
		const finalAdd = [];
		const finalMul = [];

		modsList
			.filter((mod) => !['combat_ops', 'elite_ops'].includes(mod.key))
			.forEach((ele) => {
				const mods = ele.mods.filter((mod) => mod.key === statKey);
				for (const { key, value, order = 'final', mode } of mods) {
					switch (mode) {
						case 'add':
							switch (order) {
								case 'initial':
									initialAdd.push({ key: ele.key, value });
									break;
								case 'final':
									finalAdd.push({ key: ele.key, value });
									break;
							}
							break;
						case 'mul':
							switch (order) {
								case 'initial':
									initialMul.push({ key: ele.key, value });
									break;
								case 'final':
									finalMul.push({ key: ele.key, value });
									break;
							}
							break;
					}
				}
			});
		return { initialAdd, initialMul, finalAdd, finalMul };
	}

	function getImgSrc(key) {
		switch (key) {
			case 'attack_speed':
				return aspdIcon;
			case 'ms':
				return msIcon;
			default:
				return charaAssets[key];
		}
	}
	$: console.log(enemy);
	$: console.log(otherMods);
</script>

<div class="grid grid-cols-[auto,1fr] mt-2.5">
	<div class="border-r border-gray-500 pr-3">
		{#each statsToShow as key, i}
			<button
				class="flex items-center gap-x-1.5 px-2 py-1 text-start {statIndex === i
					? 'bg-neutral-500'
					: ''}"
				on:click={() => (statIndex = i)}
			>
				<img
					src={getImgSrc(STATS_KEY_TABLE[key])}
					width="16px"
					height="16px"
					alt=""
					class="shrink-0"
				/>
				{translations[language].table_headers[STATS_KEY_TABLE[key]]}
			</button>
		{/each}
	</div>
	<div class="ml-3">
		<div class="flex items-center justify-center gap-x-1.5 px-2 py-1">
			<img
				src={getImgSrc(STATS_KEY_TABLE[statKey])}
				width="16px"
				height="16px"
				alt=""
				class="shrink-0"
			/>
			{translations[language].table_headers[STATS_KEY_TABLE[[statKey]]]}
			{enemy.forms[formIndex].stats[statKey]}
		</div>
		<DraggableContainer className="h-full">
			<div class="flex items-center justify-center pb-10 whitespace-nowrap text-xl">
				<span>=</span>&nbsp;
				{#if otherMods?.finalMul?.length > 0}
					<span>(</span>
				{/if}
				{#if otherMods?.finalAdd?.length > 0}
					<span>(</span>
				{/if}
				{#if otherMods.initialMul.length > 0}
					<span>(</span>
				{/if}
				{#if otherMods.initialAdd.length > 0}
					<span>(</span>
				{/if}{#if runeMods?.length > 0}
					<div class="relative">
						({enemy.stats[statKey]}
						<div class="absolute top-[120%] left-1/2 -translate-x-1/2 text-base">
							{translations[language].runes}
						</div>
						{#each runeMods as { key, value, mode }}
							{#if mode === 'add'}
								+ {value}
							{:else}
								× {value}{/if}{/each})
					</div>
				{:else}
					<span>
						{enemy.stats[statKey]}
					</span>
				{/if}
				{#if otherMods?.initialAdd?.length > 0}
					{#each otherMods?.initialAdd as { key, value }}
						<div class="relative">
							<div class="absolute top-[120%] left-1/2 -translate-x-1/2 w-max text-base">
								{#if translations[language][key]}
									{translations[language][key]}
								{:else if key.includes('enemy')}
									<img
										class="select-none"
										src={`/images/enemy_icons/${key}.webp`}
										height="40px"
										width="40px"
										decoding="async"
									/>
								{:else if key.includes('relic')}
									<img
										src={relicLookup[key]}
										alt={key}
										loading="lazy"
										height="40px"
										width="40px"
										decoding="async"
									/>
								{/if}
							</div>
							&nbsp;+ {value}
						</div>
					{/each}
					)
				{/if}
				{#if otherMods?.initialMul?.length > 0}
					{#each otherMods?.initialMul as { key, value }}
						<div class="relative">
							<div class="absolute top-[120%] left-1/2 -translate-x-1/2 w-max text-base">
								{#if translations[language][key]}
									{translations[language][key]}
								{:else if key.includes('enemy')}
									<img
										class="select-none"
										src={`/images/enemy_icons/${key}.webp`}
										height="40px"
										width="40px"
										decoding="async"
									/>
								{:else if key.includes('relic')}
									<img
										src={relicLookup[key]}
										alt={key}
										loading="lazy"
										height="40px"
										width="40px"
										decoding="async"
									/>
								{/if}
							</div>
							&nbsp;× {value}
						</div>
					{/each}
					)
				{/if}
				{#if otherMods?.finalAdd?.length > 0}
					{#each otherMods?.finalAdd as { key, value }}
						<div class="relative">
							<div class="absolute top-[120%] left-1/2 -translate-x-1/2 w-max text-base">
								{#if translations[language][key]}
									{translations[language][key]}
								{:else if key.includes('enemy')}
									<img
										class="select-none"
										src={`/images/enemy_icons/${key}.webp`}
										height="40px"
										width="40px"
										decoding="async"
									/>
								{:else if key.includes('relic')}
									<img
										src={relicLookup[key]}
										alt={key}
										loading="lazy"
										height="40px"
										width="40px"
										decoding="async"
									/>
								{/if}
							</div>
							&nbsp;+ {value}
						</div>
					{/each}
					)
				{/if}
				{#if otherMods?.finalMul?.length > 0}
					{#each otherMods?.finalMul as { key, value }}
						<div class="relative">
							<div class="absolute top-[120%] left-1/2 -translate-x-1/2 w-max text-base">
								{#if translations[language][key]}
									{translations[language][key]}
								{:else if key.includes('enemy')}
									<img
										class="select-none"
										src={`/images/enemy_icons/${key}.webp`}
										height="40px"
										width="40px"
										decoding="async"
									/>
								{:else if key.includes('relic')}
									<img
										src={relicLookup[key]}
										alt={key}
										loading="lazy"
										height="40px"
										width="40px"
										decoding="async"
									/>
								{/if}
							</div>
							&nbsp;× {value}
						</div>
					{/each}
					)
				{/if}
			</div>
		</DraggableContainer>
	</div>
</div>
