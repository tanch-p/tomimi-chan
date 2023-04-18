<script lang="ts">
	export let language: string;
	import StageNavButton from './StageNavButton.svelte';
	let floor1 = ['蓄水池', '虫群横行', '射手部队', '共生', '互助'];
	let floor2 = ['无声呼号', '海神的信者', '病症', '回溯', '征兆', '饥渴'];
	let floor3 = [
		'除暴安良',
		'原始部落',
		'精酿杀手',
		'大君遗脉',
		'据险固守',
		'巢穴',
		'漩涡',
		'瞻前顾后'
	];
	let floor3b = ['永恒安息', '分离与统一', '纠错'];
	let floor3b2 = ['永恒愤怒', '异体同心', '订正'];
	let floor4 = [
		'地下天途',
		'火之骄子',
		'领地意识',
		'海窟沙暴',
		'溟痕乐园',
		'狩猎场',
		'崇敬深海',
		'铳与秩序'
	];
	let floor5 = [
		'机械之灾',
		'教徒居所',
		'失控',
		'吹笛人的号召',
		'好梦在何方',
		'育生池',
		'蔓延',
		'余烬方阵'
	];
	let floorEX = ['荒地群猎', '寒灾之咒', '险路勿近'];
	let floor5b = ['认知即重担', '“命运的宠儿”'];
	let floor6 = ['水火相容', '深度认知'];
	let floor6b = ['大群所向', '人之光辉'];
	let du = ['犹豫不决', '监工现场', '拳拳到肉', '抱头狗窜', '鸭本运作'];
	let sp = ['真相', '狂信如火', '“喜”从箱来', '竭泽而渔', '图穷匕见'];

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
	<div class="bg-[#404750]">
		<div class="flex flex-wrap justify-center">
			{#each du as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
		<div class="flex flex-wrap justify-center">
			{#each sp as stageName}
				<StageNavButton {stageName} {language} />
			{/each}
		</div>
	</div>
</div>

<style>
</style>
