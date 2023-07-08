<script lang="ts">
	import translations from '$lib/translations.json';
	import type { PageData } from './$types';
	import ActionBlock from './ActionBlock.svelte';
	import KnightBlock from './KnightBlock.svelte';
	import DOQ from '$lib/images/enemy_icons/enemy_2038_sydonq.webp';
	import Lee from '$lib/images/chara_icons/头像_老鲤.webp';

	export let data: PageData;
	$: language = data.language;

	let aspdInc = 0;
	// Math.round(
	// 	(14 / 30) * Fcold + ((16 / 30) * Fcold + (Fnormal * 16) / 30) / 2
	// );
	let rounds = 20;
	let talentInset = 0;
	let resolution = 2;
	let initialTalentActivated = true;
	let doqHP50 = false;
	let moduleLevel = 3;

	$: f0 = Math.round((1 / ((100 + aspdInc) / 100)) * 14);
	$: Fnormal = Math.round((1 / ((100 + aspdInc) / 100)) * 30);
	$: Fcold = Math.round((1 / ((100 - 30 + aspdInc) / 100)) * 30);

	$: freezeDuration = doqHP50 ? 120 : 60;

	$: results = getFreezeTimings(
		rounds,
		f0,
		Fcold,
		freezeDuration,
		initialTalentActivated,
		talentInset,
		moduleLevel
	);
	$: freezeTimings = results.freezeIndexes; //used for debug
	$: fValues = results.fValues;
	$: stunTimings = results.stunTimings;
	$: console.log(stunTimings);
	$: costReductions = results.costContainer;
	$: costReductionPerMinute = costReductions.reduce(
		(acc, curr, i) => {
			const insertIndex = Math.floor(i / 20);
			if (!acc[insertIndex]) {
				acc[insertIndex] = 0;
			}
			acc[insertIndex] = acc[insertIndex] + curr;
			return acc;
		},
		[0]
	);
	function getEnemyLockFrame() {
		return Math.floor(Math.random() * 3);
	}

	function getFreezeTimings(
		rounds,
		f0,
		Fcold,
		freezeDuration,
		initialTalentActivated,
		talentInset,
		moduleLevel
	) {
		const jobCostReduction = moduleLevel === 0 ? 3 : 2;
		const talentCostReduction = moduleLevel === 3 ? 4 : 5;
		const stunDuration = moduleLevel >= 2 ? 4 * 30 : 3 * 30;
		let talentActivated = initialTalentActivated;
		let newF0 = f0 - getEnemyLockFrame();
		let newF1 = Fcold - getEnemyLockFrame();
		let newF2 = Fcold - getEnemyLockFrame();

		let costContainer = [];
		let initial2HitCounted = false;
		let counter = 1;
		let freezeIndexes = [];
		let fValues = [];
		let stunTimings = [];
		let loopIndexCounter = 1;
		let prevCounter = 0;
		for (let i = 1; i < rounds * 90; i++) {
			if (counter > 0) {
				if (!initial2HitCounted && counter === newF0 + newF1) {
					fValues.push({ key: 'f0', value: newF0 }, { key: 'f1', value: newF1 });
					prevCounter = newF0 + newF1;
					if (!talentActivated) {
						// console.log("freeze at initial2", i);
						// console.log(counter);
						freezeIndexes.push({ index: 0, counter });
						fValues.push({ key: 'frz', value: freezeDuration, counter });
						initial2HitCounted = false;
						counter = -freezeDuration;
					} else {
						stunTimings.push({ value: stunDuration, counter, i });
						initial2HitCounted = true;
					}
					talentActivated = false;
					newF0 = f0 - getEnemyLockFrame();
					newF1 = Fcold - getEnemyLockFrame();
					newF2 = Fcold - getEnemyLockFrame();
				} else if (
					initial2HitCounted &&
					counter - prevCounter > 0 &&
					(counter - prevCounter) % (newF1 + newF2) === 0
				) {
					fValues.push({ key: 'f2', value: newF2 }, { key: 'f1', value: newF1 });
					prevCounter += newF1 + newF2;
					if (!talentActivated) {
						// console.log("freeze at loop2", i);
						// console.log(counter);
						fValues.push({ key: 'frz', value: freezeDuration, counter });
						freezeIndexes.push({ index: loopIndexCounter, counter });
						initial2HitCounted = false;
						counter = -freezeDuration;
						loopIndexCounter = 0;
						prevCounter = 0;
					} else {
						stunTimings.push({ value: stunDuration, counter, i });
					}
					talentActivated = false;
					loopIndexCounter += 1;
					newF0 = f0 - getEnemyLockFrame();
					newF1 = Fcold - getEnemyLockFrame();
					newF2 = Fcold - getEnemyLockFrame();
				}
			}
			if (i - talentInset > 0 && (i - talentInset) % 90 === 0) {
				const costConsumed = jobCostReduction + (!talentActivated ? talentCostReduction : 0);
				costContainer.push(costConsumed);
				talentActivated = true;
			}
			counter += 1;
		}

		return { freezeIndexes, costContainer, fValues, stunTimings };
	}
	let timer: NodeJS.Timeout;
	let initialTimeout = 300;
	let minTimeout = 50;
	function startDecrement(num: number, timeout: number) {
		if (num > 0) {
			timer = setTimeout(function () {
				num -= 1;
				startDecrement(num, Math.max(timeout - 100, minTimeout));
			}, timeout);
		}
	}
	function startIncrement(num: number, timeout: number) {
		if (num < 80) {
			timer = setTimeout(function () {
				num += 1;
				startIncrement(num, Math.max(timeout - 100, minTimeout));
			}, timeout);
		}
	}
</script>

<svelte:head>
	<title>{translations[language].laoli_title} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].laoli_title} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/laoli`} />
</svelte:head>

<div class="min-w-screen min-h-screen bg-[#f2f2f2] text-[#222222]">
	<div class="max-w-7xl mx-auto py-16 md:px-4">
		<h1 class="text-center text-2xl font-bold mb-10">老鲤控骑士计算器（试制品）</h1>
		<p class="mb-4">※全部数据都用帧数来计算（1s = 30帧）</p>
		<div class="flex flex-col gap-y-2">
			<label>
				<span class="text-right pr-2">分辨率(放大)</span>
				<input type="number" bind:value={resolution} min="1" max="10" step="1" />
				<span class="text-right px-2">1</span>
				<input type="range" bind:value={resolution} min="1" max="10" step="1" />
				<span class="text-left px-2">10</span>
			</label>
			<label>
				<span class="text-right pr-2">回合数</span>
				<input type="number" bind:value={rounds} min="20" max="100" step="1" />
				<span class="text-right px-2">20</span>
				<input type="range" bind:value={rounds} min="20" max="100" step="5" />
				<span class="text-left px-2">100</span>
			</label>
			<label class="mb-3">
				<span class="text-right pr-2">老鲤模组等级</span>
				<input class="pl-2" type="number" bind:value={moduleLevel} min="0" max="3" step="1" />
			</label>
			<label>
				<span class="text-right pr-2">初始天赐间隔调整</span>
				<input type="number" bind:value={talentInset} min="0" max="90" step="1" />
				<span class="text-right px-2">0</span>
				<input type="range" bind:value={talentInset} min="0" max="90" step="5" />
				<span class="text-left px-2">90</span>
			</label>
			<label>
				<span class="text-right pr-2">攻速加成</span>
				<input type="number" bind:value={aspdInc} min="0" max="300" step="1" />
				<span class="text-right px-2">0</span>
				<input type="range" bind:value={aspdInc} min="0" max="300" step="1" />
				<span class="text-left px-2">300</span>
			</label>
			<label>
				<span class="text-right pr-2">未寒冷前摇(F0)</span>
				<button
					class="border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"
					on:click={() => (f0 -= 1)}
					disabled={f0 <= 0}
				>
					－
				</button>
				<input class="text-center" type="number" bind:value={f0} min="0" max="14" step="1" />
				<button
					class="border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"
					on:click={() => (f0 += 1)}
					disabled={f0 >= 18}
				>
					＋
				</button>
			</label>
			<p class="pl-[68px]">Fnormal: {Fnormal} &nbsp&nbsp Fcold: {Fcold}</p>
			<div class="grid grid-cols-[140px_auto_auto_auto] w-max">
				<span class="text-right pr-2">攻击间隔(F1,F2)</span>
				<button
					class="border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"
					on:mousedown={() => startDecrement(Fcold, initialTimeout)}
					on:mouseup={() => clearTimeout(timer)}
					on:mouseleave={() => clearTimeout(timer)}
					on:click={() => (Fcold -= 1)}
					disabled={Fcold <= 0}
				>
					－
				</button>
				<input class="text-center" type="number" bind:value={Fcold} min="0" max="60" step="1" />
				<button
					class="border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"
					on:mousedown={() => startIncrement(Fcold, initialTimeout)}
					on:mouseup={() => clearTimeout(timer)}
					on:mouseleave={() => clearTimeout(timer)}
					on:click={() => (Fcold += 1)}
					disabled={Fcold >= 80}
				>
					＋
				</button>
			</div>
			<label class="mt-3">
				<span class="text-right pr-2">初始拥有天赐的<br />抵消效果</span>
				<input class="justify-self-start" type="checkbox" bind:checked={initialTalentActivated} />
			</label>
			<label>
				<span class="text-right pr-2">骑士生命少于50%</span>
				<input class="justify-self-start" type="checkbox" bind:checked={doqHP50} />
			</label>
		</div>
		<p class="text-lg font-bold text-center mt-3 mb-2">
			天赐3s | Cost/min:
			{#each costReductionPerMinute as cost, i}
				{#if i > 0}
					,
				{/if}
				{cost}
			{/each}
		</p>
		<div class="flex flex-col overflow-auto px-1.5 md:px-0">
			<KnightBlock {resolution} {stunTimings} />
			<div class="flex w-max" style={`margin-left:${talentInset * resolution}px`}>
				{#each Array(rounds) as _, index}
					<div class="flex flex-col items-center">
						<p class="text-lg font-bold">{index + 1}</p>
						<div
							class={`h-[24px] border-r border-black ${
								index % 2 === 0 ? 'bg-neutral-900' : 'bg-gray-600'
							}`}
							style={`width:${90 * resolution}px`}
						/>
					</div>
				{/each}
			</div>
			<ActionBlock {resolution} {fValues} {freezeDuration} />
		</div>
		<p class="text-lg font-bold text-center mt-2">图例</p>
		<div class="flex flex-wrap justify-evenly rounded border bg-slate-200 py-2.5">
			<div class="flex items-center gap-x-2">
				<div class="h-4 w-4 bg-[#fdfc01]" />
				<span> 未寒冷前摇 </span>
			</div>
			<div class="flex items-center gap-x-2">
				<div class="h-4 w-4 bg-[#f8cc47]" />
				<div class="h-4 w-4 bg-[#f28b00]" />
				<span> 俩次攻击间隔 </span>
			</div>
			<div class="flex items-center gap-x-2">
				<div class="h-4 w-4 bg-[#34c2e6]" />
				<span> 冻结间隔 </span>
			</div>
			<div class="flex items-center gap-x-2">
				<div class="h-4 w-4 bg-neutral-900" />
				<div class="h-4 w-4 bg-gray-600" />
				<span>天赐3s</span>
			</div>
		</div>

		<p class="text-lg font-bold mt-8">Debug用</p>
		<p>
			冻结Index（0起步）：
			{#each freezeTimings as { index }, i}
				{#if i > 0}
					,
				{/if}
				{index}
			{/each}
		</p>
		<p>
			Cost：
			{#each costReductions as cost, i}
				{#if i > 0}
					,
				{/if}
				{cost}
			{/each}
		</p>
		<p>
			F values:
			{#each fValues as { key, value }, i}
				{#if i > 0}
					,
				{/if}
				{value}
			{/each}
		</p>
	</div>
</div>

<style>
	label {
		display: grid;
		grid-template-columns: 140px auto auto auto auto;
		width: max-content;
	}
	label:has(input[type='range']) {
		display: grid;
		grid-template-columns: 140px 60px 40px 150px 40px;
		width: max-content;
	}
	label:has(input[type='range']) input[type='number'] {
		padding-left: 8px;
	}
	input[type='number'] {
		width: 60px;
	}
	@media only screen and (max-width: 640px) {
		label:has(input[type='range']) {
			display: grid;
			grid-template-columns: 140px 60px 30px 100px 30px;
			width: max-content;
		}
	}
</style>
