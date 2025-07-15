<script lang="ts">
	import type { Language } from '$lib/types';
	import StageNavButton from './StageNavButton.svelte';
	import combat_ops from '$lib/images/is/sarkaz/node_battle.webp';
	import boss from '$lib/images/is/sarkaz/boss_2.webp';
	import boss_big from '$lib/images/is/sarkaz/boss_icon.webp';
	import encounter from '$lib/images/is/sarkaz/node_inv.webp';
	import translations from '$lib/translations.json';
	import duelIcon from '$lib/images/is/sarkaz/node_duel.webp';
	import shop from '$lib/images/is/sarkaz/node_shop.webp';

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
	// let floor5bd = ['思维矫正', '魂灵朝谒'];
	let floor6b = ['谋岁者'];
	let du = ['源源不断', '闪闪发光', '循循善诱', '易易鸭鸭'];
	let sp = ['劫罚', '生百相', '硕果累累', '以逸待劳'];
	// let sp2 = ['物权纠纷', '叙事要约'];
	let sp3 = ['喜从驮来', '硅基伥的宴席', '彻底失控', '为崖作伥'];

	let duel = ['夕江对擂', '南武群英会'];
	let candle = ['谤天', '迎雷', '蔑震', '赴陨', '斥洪', '分明'];
	let sv = ['地有四难', '凭器', '忘形', '贪妄', '奇谭', '破局', '不鉴', '靡靡之音', '愠怒', '迷惘'];
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
				<td colspan="2" rowspan="2">
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
							width="160px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				<td colspan="2" rowspan="3">
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
				<th colspan="2" class="empty" />
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={boss_big}
							alt={translations[language].boss_ops}
							width="160px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				<td colspan="2" rowspan="2">
					{5}
				</td>
				{#each floor5b as stageName}
					<td colspan={Math.floor(24 / floor5b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<!-- <tr>
				{#each floor5bd as stageName}
					<td colspan={Math.floor(24 / floor5b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr> -->
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
				<td colspan="2" rowspan="6"> ? </td>
				{#each du as stageName}
					<td colspan={Math.floor(24 / du.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each sp as stageName}
					<td colspan={Math.floor(24 / sp.length)}>
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
				{#each sp3 as stageName}
					<td colspan={Math.floor(24 / sp3.length)}>
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
				{#each duel as stageName}
					<td colspan={Math.floor(24 / duel.length)}>
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
