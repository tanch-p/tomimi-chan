<script lang="ts">
	import combat_icon from '$lib/images/is/combat_icon.webp';

	export let stageId: string, eliteMode, combatOpsColor, eliteOpsColor, getEliteIcon;
</script>

<div class="grid grid-cols-2 font-bold text-lg text-gray-700 select-none">
	<button
		id="normal-toggle"
		class={`flex justify-center items-center py-1 ${combatOpsColor} ${
			!$eliteMode ? 'text-gray-900' : 'opacity-30'
		}`}
		on:click={() => eliteMode.set(false)}
	>
		<img src={combat_icon} width="50px" decoding="async" loading="lazy" alt="combat ops" class="" />
	</button>
	<button
		id="elite-toggle"
		class={`flex justify-center items-center ${eliteOpsColor} ${
			$eliteMode ? 'text-black' : 'opacity-30'
		}`}
		on:click={() => eliteMode.set(true)}
	>
		<img
			src={getEliteIcon(stageId)}
			width="50px"
			decoding="async"
			loading="lazy"
			alt="elite ops"
			class=""
		/>
	</button>
</div>
