<script lang="ts">
	import StageNavButton from './StageNavButton.svelte';
	import combat_ops from '$lib/images/is/phantom/combat_ops.webp';
	import boss from '$lib/images/is/phantom/boss.webp';
	import encounter from '$lib/images/is/phantom/encounter.webp';
	import translations from '$lib/translations.json';
	import romanNumerals from '$lib/roman_numerals.json';

	export let language: string;

	let allNormalStages = [
		['与虫为伴', '驯兽小屋', '礼炮小队', '意外', '死斗'],
		['压轴登场', '巡逻队', '落魄骑士', '分赃不均', '先来后到'],
		['正义', '似曾相识', '酒商运输队', '从众效应', '斗兽笼', '首演', '感化', '雕匠与石像'],
		['步步紧逼', '阴云笼罩', '烟花秀', '永无尽头', '远方来客', '共舞', '鲍勃酒品', '雪山上的来客'],
		[
			'无人机起降库',
			'红雾弥漫',
			'仪式之夜',
			'彻骨冰寒',
			'危机四伏',
			'惊喜工厂',
			'荒唐把戏',
			'隔岸观火'
		],
		['萨卡兹的渴求', '乌萨斯的渴求']
	];

	let floor3t = ['开门请当心', '大盗当头', '恐怖传说', '悦耳杀机'];
	let floor3b = ['寒渊惜别'];
	let floor5b = ['覆水难收', '别无所求'];
	let floor6b = ['诸事不顺', '再启新篇'];
	let du = ['鸭爵的戏剧', '鸭爵的宴会', '高普尼克之拳', '这位乌萨斯人'];
	let sp = ['邪异囚笼', '无序盛宴', '“骑士对决”'];

	//max per row = 4
</script>

<div class="max-w-6xl mx-auto sm:px-4">
	<table class="text-xs sm:text-base">
		<tbody>
			<tr>
				<th class="empty" />
				<th colspan="16">
					<div class="flex justify-center items-center">
						<img
							src={combat_ops}
							alt={translations[language].combat_ops}
							width="100px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th></tr
			>
			{#each allNormalStages as stages, i}
				{@const rowSpan = stages.length <= 4 ? 1 : 2}
				<tr>
					<td rowspan={rowSpan}>
						{romanNumerals[i]}
					</td>
					{#if rowSpan === 2}
						{@const topRowStages = stages.slice(0, 4)}
						{#each topRowStages as stageName}
							<td colspan="4">
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{:else}
						{#each stages as stageName}
							<td colspan={Math.floor(16 / stages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{/if}
				</tr>
				{#if rowSpan === 2}
					{@const btmRowStages = stages.slice(4)}
					{#if btmRowStages.length >= 3}
						{#each btmRowStages as stageName}
							<td colspan="4">
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{:else}
						{#each btmRowStages as stageName}
							<td colspan={Math.floor(16 / btmRowStages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{/if}
				{/if}
			{/each}

			<!-- boss -->
			<tr>
				<th class="empty" />
				<th colspan="16">
					<div class="flex justify-center items-center">
						<img
							src={boss}
							alt={translations[language].boss}
							width="100px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				<td rowspan="2">
					{romanNumerals[2]}
				</td>
				{#each floor3t as stageName}
					<td colspan="4">
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each floor3b as stageName}
					<td colspan={Math.floor(16 / floor3b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td>
					{romanNumerals[4]}
				</td>
				{#each floor5b as stageName}
					<td colspan={Math.floor(16 / floor5b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td>
					{romanNumerals[5]}
				</td>
				{#each floor6b as stageName}
					<td colspan={Math.floor(16 / floor6b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>

			<!-- encounter -->

			<tr>
				<th class="empty" />
				<th colspan="16">
					<div class="flex justify-center items-center">
						<img
							src={encounter}
							alt={translations[language].boss}
							width="100px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				<td rowspan="2"> ? </td>
				{#each du as stageName}
					<td colspan={Math.floor(16 / du.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td colspan="16">
					<div class="grid grid-cols-3 divide-x divide-[#808080]">
						{#each sp as stageName}
							<StageNavButton {stageName} {language} />
						{/each}
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	table {
		color: #f2f2f2;
		text-align: center;
		table-layout: fixed;
		width: 100%;
	}

	th.empty {
		border-width: 1px 0 1px 1px;
	}

	th {
		border-width: 1px 1px 1px 0;
		border-color: gray;
		padding: 6px 0;
	}

	td {
		border-width: 1px;
		border-color: gray;
	}
</style>
