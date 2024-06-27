<script lang="ts">
	import { filtersStore, relicFiltersStore } from './stores';
	import Icon from '$lib/components/Icon.svelte';

	const reset = () => {
		filtersStore.update((list) =>
			list.map((ele) => {
				return {
					...ele,
					options: ele.options.map((option) => {
						return { ...option, selected: false };
					})
				};
			})
		);
		relicFiltersStore.update((list) =>
			list.map((ele) => {
				return { ...ele, selected: false };
			})
		);
	};
</script>

<button
	class="fixed bottom-[150px] right-[20px] md:right-[40px] z-50"
	on:click={() => reset()}
	id="scroll-top-button"
>
	<div
		class="flex items-center justify-center h-[45px] w-[45px] rounded-full bg-slate-700 hover:bg-[rgb(40,51,69)]"
	>
		<Icon name="trash" className="stroke-white" />
	</div>
</button>
