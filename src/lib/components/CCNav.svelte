<script lang="ts">
	import translations from '$lib/translations.json';

    export let language:string;

	const dailyStages = [
		{ name: '冻原矿场', m: 6, d: 23, href: '冻原矿场_11-1' },
		{ name: '冻原矿场', m: 6, d: 24, href: '冻原矿场_11-1' },
		{ name: '沙海遗迹', m: 6, d: 25, href: '沙海遗迹_11-1' },
		{ name: '大骑士领酒吧街', m: 6, d: 26, href: '大骑士领酒吧街_11-1' },
		{ name: '盐风溶洞', m: 6, d: 27, href: '盐风溶洞_11-1' },
		{ name: '尚蜀山道', m: 6, d: 28, href: '尚蜀山道_11-1' },
		{ name: '伦蒂尼姆边缘区块', m: 6, d: 29, href: '伦蒂尼姆边缘区块_11-1' },
		{ name: '小丘郡物流站', m: 6, d: 30, href: '小丘郡物流站_11-1' },
		{ name: '大骑士领酒吧街', m: 7, d: 1, href: '大骑士领酒吧街_11-2' },
		{ name: '盐风溶洞', m: 7, d: 2, href: '盐风溶洞_11-2' },
		{ name: '尚蜀山道', m: 7, d: 3, href: '尚蜀山道_11-2' },
		{ name: '伦蒂尼姆边缘区块', m: 7, d: 4, href: '伦蒂尼姆边缘区块_11-2' },
		{ name: '小丘郡物流站', m: 7, d: 5, href: '小丘郡物流站_11-2' },
		{ name: '冻原矿场', m: 7, d: 6, href: '冻原矿场_11-2' }
	];

	const today = new Date();
	const isPickup = (d: number) => {
		return today.getDate() === d;
	};
</script>

<div class="border border-gray-500 text-center">
	<div class="border-b border-gray-500 py-2">{translations[language].index.perma_stage}</div>
	<a href="/{language}/stages/在建沙滩">
		<div class={`py-2 hover:cursor-pointer hover:bg-gray-600 text-indigo-300 `}>
			{translations[language].在建沙滩}
		</div>
	</a>
	<div class="border-y border-gray-500 py-2">
		{translations[language].index.daily_stage}
	</div>
	<div class="grid grid-cols-4 md:grid-cols-7 items-center gap-y-4 text-sm py-2">
		{#each dailyStages as stage}
			<a href="/{language}/stages/{stage.href}">
				<div
					class={`grid grid-rows-[auto_60px] md:grid-rows-[auto_48px] items-center ${
						isPickup(stage.d) ? 'bg-gray-600' : 'hover:bg-gray-600'
					}`}
				>
					<p>{stage.m}/{stage.d}</p>
					<p class={`flex justify-center items-center py-1 h-full text-indigo-300`}>
						{translations[language][stage.name] ?? stage.name}
					</p>
				</div>
			</a>
		{/each}
	</div>
</div>
