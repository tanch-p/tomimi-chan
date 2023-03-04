<script lang="ts">
	import mizukiOptions from '$lib/data/floor_effects_mizuki.json';
	import FloorEffect from './FloorEffect.svelte';

	export let optionsOpen: boolean, language: string;

	async function getSrc() {
		for (const option of mizukiOptions) {
			option.src = (await import(`../../../../../lib/images/is/e_${option.name_zh}.png`)).default;
		}
		return mizukiOptions;
	}
	$: promise = getSrc();
</script>

{#await promise then options}
	<div
		class={`absolute left-[50%] -translate-x-[50%] mt-2 w-[100vw] md:w-[700px] pb-8 rounded-md shadow-lg select-none bg-[#1c1c1c] transition-[opacity_transform] ease-in duration-150 ${
			optionsOpen ? 'opacity-90 translate-y-0' : 'invisible opacity-0 -translate-y-10'
		}`}
	>
		<div class="mx-auto mt-3 px-2 md:px-8">
			<p class="font-medium text-lg text-[#b43b3b] text-center">
				大群的呼唤 <span class="font-normal text-base text-near-white">Max 2</span>
			</p>
			<hr class="my-2 border-gray-600"/>
			<div class="flex flex-col gap-y-4">
				{#each options as option}
					<FloorEffect effect={option} {language} />
				{/each}
			</div>
		</div>
	</div>
{/await}
