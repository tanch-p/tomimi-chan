<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside';
	import type { Language } from '$lib/types';
	import { selectedChara } from './stores';
	import translations from '$lib/translations.json';
	import hpIcon from '$lib/images/is/icon_sort_hp.webp';
	import atkIcon from '$lib/images/is/icon_sort_atk.webp';
	import defIcon from '$lib/images/is/icon_sort_def.webp';
	import resIcon from '$lib/images/is/icon_sort_res_def.webp';
	import aspdIcon from '$lib/images/is/aspd.webp';

	export let language: Language;
	const statKeyIcons = {
		hp: hpIcon,
		atk: atkIcon,
		def: defIcon,
		res: resIcon,
		// respawnTime: respawnIcon,
		// cost: costIcon,
		// blockCnt: blockIcon,
		aspd: aspdIcon
	};
	const statKeys = ['hp', 'respawnTime', 'atk', 'cost', 'def', 'blockCnt', 'cost', 'aspd'];

	$: console.log($selectedChara);
</script>

<div class="overlay" class:visible={$selectedChara}>
	<div
		class:visible={$selectedChara}
		class="popup text-black"
		use:clickOutside
		on:outclick={() => selectedChara.set(null)}
	>
		<button class="absolute right-[8px] text-black" on:click={() => selectedChara.set(null)}
			>x</button
		>
		{#if $selectedChara}
			{@const displayLang = !!$selectedChara.name_en ? language : 'zh'}
			<div class="grid grid-cols-[75px_1fr]">
				<img src="" width="75" height="75" alt={$selectedChara.appellation} />
				<div>
					<p>{$selectedChara[`name_${displayLang}`]}</p>
					<p>全部位</p>
				</div>
			</div>
			<div>
				<div class="grid grid-cols-[120px_1fr] gap-x-2 items-center">
					<div>range</div>
					<div class="grid grid-cols-2 gap-x-2 gap-y-1">
						{#each statKeys as statKey}
							<div
								class={`flex flex-col bg-[#161616] bg-opacity-80 px-1 ${
									language === 'en' ? 'text-sm' : ''
								}`}
							>
								<div class="flex items-center gap-x-1.5">
									<img src={statKeyIcons[statKey]} width="14px" height="14px" alt="" />
									<p class="text-near-white">
										{$selectedChara['stats'][statKey]}{statKey === 'respawnTime' ? 's' : ''}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="grid grid-cols-[75px_1fr] items-center">
				<img src="" width="75" height="75" alt="icon" />
				{$selectedChara.subProfessionId}
			</div>
			<p>{$selectedChara[`desc_${displayLang}`]}</p>
			<p>{translations[language].module}</p>
			<div class="p-3">
				<div class="module none" />
			</div>
			{#if $selectedChara.skills && $selectedChara.skills.length > 0}
				<p>{translations[language].skill}</p>
				{#each $selectedChara.skills as skill}
					<p>{skill[`name_${displayLang}`]}</p>
					<p>{skill[`description_${displayLang}`]}</p>
				{/each}
			{/if}
			{#if $selectedChara.talents && $selectedChara.talents.length > 0}
				<p>{translations[language].talent}</p>
				{#each $selectedChara.talents as talent}
					<p>{talent[`name_${displayLang}`]}</p>
					<p>{talent[`description_${displayLang}`]}</p>
				{/each}
			{/if}
		{/if}
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 99;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.3s;
	}
	.popup {
		border-radius: 5px;
		width: min(calc(100% - 15px), 500px);
		position: fixed;
		background-color: white;
		inset: 0;
		min-height: 300px;
		max-height: 500px;
		margin: auto;
		pointer-events: none;
		transition: transform 0.3s, opacity 0.2s, -webkit-transform 0.3s;
		opacity: 0;
		overflow-y: auto;
	}
	.overlay.visible,
	.popup.visible {
		pointer-events: all;
		opacity: 1;
	}
	.module {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #363636;
	}
	.module.none:after {
		content: '';
		position: absolute;
		top: 50%;
		left: calc(-25% + 1px);
		width: calc(1px * sqrt(pow(50, 2) * 2) - 1px);
		height: 1px;
		background-color: #000;
		transform: rotate(-45deg);
	}
</style>
