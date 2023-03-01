<script lang="ts">
	export let language: string;
	import StageNavButton from './StageNavButton.svelte';
	let floor1 = ['蓄水池', '虫群横行', '射手部队', '共生'];
	let floor2 = ['无声呼号', '海神的信者', '病症', '回溯', '征兆', '除暴安良'];
	let floor3 = ['原始部落', '精酿杀手', '大君遗脉', '据险固守', '巢穴', '漩涡'];
	let floor3b = ['永恒安息', '分离与统一', '纠错'];
	let floor3b2 = ['永恒愤怒', '异体同心', '订正'];
	let floor4 = ['地下天途', '火之骄子', '领地意识', '海窟沙暴', '溟痕乐园', '狩猎场', '崇敬深海'];
	let floor5 = ['机械之灾', '教徒居所', '失控', '吹笛人的号召', '好梦在何方', '育生池', '蔓延'];
	let floorEX = ['荒地群猎', '寒灾之咒', '险路勿近'];
	let floor5b = ['认知即重担', '“命运的宠儿”'];
	let floor6 = ['水火相容', '深度认知'];
	let floor6b = ['大群所向'];
	//max per row = 4
</script>

<div class="flex flex-col max-w-4xl mx-auto mt-8 text-near-white">
	<div class="bg-[#258CD0] ">
		<div class="flex flex-wrap justify-center">
			{#each floor1 as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
	</div>
	<div class="bg-[#2B7EB6]">
		<div class="flex flex-wrap justify-center">
			{#each floor2 as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
	</div>
	<div class="bg-[#164664]">
		<div class="flex flex-wrap justify-center">
			{#each floor3 as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
		<div class="flex flex-wrap justify-center">
			{#each floor3b as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
		<div class="flex flex-wrap justify-center">
			{#each floor3b2 as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
	</div>
	<div class="bg-[#0A2A5E]">
		<div class="flex flex-wrap justify-center">
			{#each floor4 as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
	</div>
	<div class="bg-[#061A37]">
		<div class="flex flex-wrap justify-center">
			{#each floor5 as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
		<div class="flex flex-wrap justify-center">
			{#each floorEX as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
		<div class="flex flex-wrap justify-center">
			{#each floor5b as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
	</div>
	<div class="bg-[#020912]">
		<div class="flex flex-wrap justify-center">
			{#each floor6 as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
		<div class="flex flex-wrap justify-center">
			{#each floor6b as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
	</div>
</div>

<style>

</style>