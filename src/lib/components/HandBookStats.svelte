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

	export let enemy: Enemy, language: Language, formIndex: number;

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

	$: statKeys =
		language === 'zh'
			? ['hp', 'ms', 'atk', 'aspd', 'def', 'eleRes', 'res', 'eleDmgRes']
			: ['hp', 'ms', 'atk', 'aspd', 'def', 'res'];
</script>

<div class="grid grid-cols-2 gap-2">
	{#each statKeys as statKey}
		<div class={`flex flex-col bg-[#161616] bg-opacity-80 px-1 ${language === "en" ? "text-sm" : ""}`}>
			<div class="flex items-center gap-x-1">
				<img src={statKeyIcons[statKey]} width="14px" height="14px" alt="" />
				<span class="text-[#858585] font-semibold">
					{translations[language].table_headers[statKey]}
				</span>
			</div>
			<p class="text-near-white px-[18px]">{enemy.stats[formIndex][statKey] ?? "0"}</p>
		</div>
	{/each}
</div>
