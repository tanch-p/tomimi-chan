<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import hpIcon from '$lib/images/is/icon_sort_hp.webp';
	import atkIcon from '$lib/images/is/icon_sort_atk.webp';
	import defIcon from '$lib/images/is/icon_sort_def.webp';
	import resIcon from '$lib/images/is/icon_sort_res_def.webp';
	import aspdIcon from '$lib/images/is/aspd.webp';
	import msIcon from '$lib/images/is/movespeed.webp';
	import eleDmgResIcon from '$lib/images/is/ele_dmg_res.webp';
	import eleResIcon from '$lib/images/is/ele_res.webp';

	export let enemy: Enemy,
		language: Language,
		formIndex: number,
		mode = 'mobile';

	const statKeyIcons = {
		hp: hpIcon,
		atk: atkIcon,
		def: defIcon,
		res: resIcon,
		ms: msIcon,
		aspd: aspdIcon,
		eleDmgRes: eleDmgResIcon,
		eleRes: eleResIcon
	};

	const statKeys =
		mode === 'mobile'
			? ['hp', 'ms', 'atk', 'aspd', 'def', 'eleRes', 'res', 'eleDmgRes']
			: ['hp', 'atk', 'aspd', 'eleRes', 'ms', 'def', 'res', 'eleDmgRes'];
</script>

<div>
	<div class="grid gap-2 text-sm {mode === 'mobile' ? 'grid-cols-2 w-full ' : 'grid-cols-4 w-max'} ">
		{#each statKeys as statKey}
			<div
				class={`flex flex-col bg-[#161616] bg-opacity-80 px-1 ${
					language === 'en' ? '' : 'whitespace-nowrap'
				}`}
			>
				<div class="grid grid-cols-[14px_1fr] items-center gap-x-1">
					<img src={statKeyIcons[statKey]} width="14px" height="14px" alt="" class="" />
					<span
						class="text-[#858585] font-semibold {language === 'en' &&
						['aspd', 'eleDmgRes'].includes(statKey)
							? 'text-xs leading-[20px]'
							: ''}"
					>
						{translations[language].table_headers[statKey]}
					</span>
				</div>
				<p data-id="{statKey}-value" class="text-near-white px-[18px]">
					{enemy.forms[formIndex].stats[statKey] ?? '0'}
				</p>
			</div>
		{/each}
	</div>
	<p class="text-[#858585] font-semibold mt-1.5 text-sm">
		{translations[language].table_headers.range}:
		<span data-id="range-value" class="text-near-white">{enemy.forms[formIndex].stats.range <= 0 ? '0' : enemy.forms[formIndex].stats.range}</span>
	</p>
</div>
