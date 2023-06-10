<script lang="ts">
	export let risk: number, type: 'perma' | 'daily';
</script>

<div
	class={`flex flex-wrap flex-row bg-white place-content-center py-1   ${
		type === 'daily' ? 'rounded-r h-full min-w-[45px]' : 'rounded h-[20px] w-[50px]'
	}`}
>
	{#if risk === 1}
		<div
			class={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-b-[12px] border-b-gray-500 z-50 `}
		/>
	{:else if risk === 2}
		<div
			class={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-b-[12px] border-b-gray-800 z-50 translate-x-0.5`}
		/>
		<div
			class={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-t-[12px] border-t-gray-800 z-50 -translate-x-0.5`}
		/>
	{:else}
		<div
			class={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-b-[12px] border-b-red-600 z-50 translate-x-1`}
		/>
		<div
			class={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-t-[12px] border-t-red-600 z-50 `}
		/>
		<div
			class={`w-0 h-0 border-x-transparent border-x-[8px] border-solid border-b-[12px] border-b-red-600 z-50 -translate-x-1`}
		/>
	{/if}
</div>
