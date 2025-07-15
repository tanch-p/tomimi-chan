<script lang="ts">
	import type { Language } from '$lib/types';
	import StageNavButton from './StageNavButton.svelte';
	import combat_ops from '$lib/images/is/sui/node_battle.webp';
	import boss from '$lib/images/is/sui/boss_focus.webp';
	import encounter from '$lib/images/is/sui/node_inv.webp';
	import translations from '$lib/translations.json';
	import duelIcon from '$lib/images/is/sui/node_duel.webp';
	import shop from '$lib/images/is/sui/node_shop.webp';
	import candleIcon from '$lib/images/is/sui/node_stashed_recruit.webp';
	import portal from '$lib/images/is/sui/node_spZone.webp';

	export let language: Language;

	let allNormalStages = [
		['狡鼷三窟', '赶集', '正经生意', '老戏骨'],
		['有教无类', '飞来横祸', '所守者，义', '明抢暗偷'],
		['啖之以利', '长驱不复', '背山面水', '去晦', '落叶归根'],
		['山海必争', '贪饵', '识文', '赶场戏班', '峥嵘战功', '暗箭难防'],
		['青山不语', '离域检查', '薄礼一份', '往事喑哑', '邙山镇地方志', '不成烟火']
	];

	let floor6n_1 = ['炎灼', '人镇'];
	let floor3t = ['月华寒', '剑·刀·矛', '点化'];
	let floor3b = ['夕娥忆', '仁·义·武', '求道'];
	let floor5b = ['破岁阵祀', '昔字如烟'];
	let floor6b = ['谋岁者'];
	let du = ['源源不断', '闪闪发光', '循循善诱', '易易鸭鸭'];
	let encount1 = ['劫罚', '生百相', '硕果累累', '以逸待劳'];
	let encount2 = ['喜从驮来', '硅基伥的宴席', '彻底失控', '为崖作伥'];
	let shopStages = ['神游天外', '作壁上观'];

	let duelRow1 = ['夕江对擂'];
	let duelRow2 = ['南武群英会_a', '南武群英会_b', '南武群英会_c'];
	let candleRow1 = ['谤天', '迎雷', '蔑震'];
	let candleRow1Alt = ['谤天_b', '迎雷_b', '蔑震_b'];
	let candleRow2 = ['赴陨', '斥洪'];
	let candleRow2Alt = ['赴陨_b', '斥洪_b'];
	let candleSP = ['分明'];
	let svRow1 = ['地有四难', '忘形', '奇谭', '破局'];
	let svRow1Alt = ['地有四难_b', '忘形_b', '奇谭_b', '破局_b'];
	let svRow2 = ['不鉴', '靡靡之音', '迷惘'];
	let svRow2Alt = ['不鉴_b', '靡靡之音_b', '迷惘_b'];
	let sv2 = ['凭器_a', '凭器_b', '凭器_c'];
	let sv9 = ['愠怒_a', '愠怒_b', '愠怒_c'];
	let sv4 = ['贪妄'];

	//max per row = 4
</script>

<div class="max-w-6xl mx-auto">
	<table class="text-xs sm:text-base">
		<tbody>
			<tr>
				<th colspan="2" class="empty" />
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={combat_ops}
							alt={translations[language].combat_ops}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			{#each allNormalStages as stages, i}
				{@const rowSpan = stages.length > 8 ? 3 : stages.length <= 4 ? 1 : 2}
				<tr>
					<td colspan="2" rowspan={rowSpan}>
						{i + 1}
					</td>
					{#if rowSpan === 3}
						{@const topRowStages = stages.slice(0, 4)}
						{#each topRowStages as stageName}
							<td colspan={Math.floor(24 / topRowStages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{:else if rowSpan === 2}
						{@const topRowStages = stages.slice(0, 4)}
						{#each topRowStages as stageName}
							<td colspan={Math.floor(24 / topRowStages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{:else}
						{#each stages as stageName}
							<td colspan={Math.floor(24 / stages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{/if}
				</tr>
				{#if rowSpan === 3}
					{@const midRowStages = stages.slice(4, 7)}
					{@const btmRowStages = stages.slice(7)}
					<tr>
						{#each midRowStages as stageName}
							<td colspan={Math.floor(24 / midRowStages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					</tr>
					<tr>
						{#each btmRowStages as stageName}
							<td colspan={Math.floor(24 / btmRowStages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					</tr>
				{:else if rowSpan === 2}
					{@const btmRowStages = stages.slice(4)}
					<tr>
						{#if btmRowStages.length >= 3}
							{#each btmRowStages as stageName}
								<td colspan={Math.floor(24 / btmRowStages.length)}>
									<StageNavButton {stageName} {language} />
								</td>
							{/each}
						{:else}
							{#each btmRowStages as stageName}
								<td colspan={Math.floor(24 / btmRowStages.length)}>
									<StageNavButton {stageName} {language} />
								</td>
							{/each}
						{/if}
					</tr>
				{/if}
			{/each}
			<tr>
				<td colspan="2" rowspan="1">
					{6}
				</td>
				{#each floor6n_1 as stageName}
					<td colspan={Math.floor(24 / floor6n_1.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<!-- boss -->
			<tr>
				<th colspan="2" class="empty" />
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={boss}
							alt={translations[language].boss_ops}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				<td colspan="2" rowspan="2">
					{3}
				</td>
				{#each floor3t as stageName}
					<td colspan={Math.floor(24 / floor3t.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each floor3b as stageName}
					<td colspan={Math.floor(24 / floor3b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td colspan="2" rowspan="1">
					{5}
				</td>
				{#each floor5b as stageName}
					<td colspan={Math.floor(24 / floor5b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td colspan="2" rowspan="1">
					{6}
				</td>
				{#each floor6b as stageName}
					<td colspan={Math.floor(24 / floor6b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>

			<!-- encounter -->

			<tr>
				<th colspan="2" class="empty" />
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={encounter}
							alt={translations[language].encounter}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				<td colspan="2" rowspan="22"> ? </td>
				{#each du as stageName}
					<td colspan={Math.floor(24 / du.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each encount1 as stageName}
					<td colspan={Math.floor(24 / encount1.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each encount2 as stageName}
					<td colspan={Math.floor(24 / encount2.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={shop}
							alt={translations[language].shop}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				{#each shopStages as stageName}
					<td colspan={Math.floor(24 / shopStages.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={candleIcon}
							alt={translations[language].sui_candle}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				{#each candleRow1 as stageName}
					<td colspan={Math.floor(24 / candleRow1.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each candleRow1Alt as stageName}
					<td colspan={Math.floor(24 / candleRow1Alt.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each candleRow2 as stageName}
					<td colspan={Math.floor(24 / candleRow2.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each candleRow2Alt as stageName}
					<td colspan={Math.floor(24 / candleRow2Alt.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each candleSP as stageName}
					<td colspan={Math.floor(24 / candleSP.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={portal}
							alt={translations[language].sui_portal}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				{#each svRow1 as stageName}
					<td colspan={Math.floor(24 / svRow1.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each svRow1Alt as stageName}
					<td colspan={Math.floor(24 / svRow1Alt.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each svRow2 as stageName}
					<td colspan={Math.floor(24 / svRow2.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each svRow2Alt as stageName}
					<td colspan={Math.floor(24 / svRow2Alt.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each sv2 as stageName}
					<td colspan={Math.floor(24 / sv2.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each sv9 as stageName}
					<td colspan={Math.floor(24 / sv9.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each sv4 as stageName}
					<td colspan={Math.floor(24 / sv4.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={duelIcon}
							alt={translations[language].duel}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				{#each duelRow1 as stageName}
					<td colspan={Math.floor(24 / duelRow1.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each duelRow2 as stageName}
					<td colspan={Math.floor(24 / duelRow2.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
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
