<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	export let hasBtm = false;
	let showTop: Boolean = false,
		showBtm: Boolean = false;
	onMount(() => {
		if (window) {
			window.onscroll = function () {
				showTop = document.documentElement.scrollTop > 700;
				showBtm = document.documentElement.scrollTop < document.body.scrollHeight - 1400;
			};
		}
	});
	function scrollToNav() {
		const targetElement = document.getElementById('stageNav');
		if (targetElement) {
			targetElement.scrollIntoView();
		}
	}
</script>

<div class="fixed max-w-[1280px] mx-auto inset-0 z-10 pointer-events-none">
	<button
		hidden={!showTop}
		class="absolute {hasBtm
			? 'bottom-[150px]'
			: 'bottom-[90px]'} right-[20px] md:right-[40px] pointer-events-auto"
		on:click={() => window.scrollTo(0, 0)}
		id="scroll-top-button"
	>
		<div
			class="flex items-center justify-center h-[45px] w-[45px] rounded-full bg-slate-700 hover:bg-[rgb(40,51,69)]"
		>
			<Icon name="down-arrow" className="rotate-180" />
		</div>
	</button>
	{#if hasBtm}
		<button
			hidden={!showBtm}
			class="absolute bottom-[90px] right-[20px] md:right-[40px] pointer-events-auto"
			on:click={scrollToNav}
			id="scroll-btm-button"
		>
			<div
				class="flex items-center justify-center h-[45px] w-[45px] rounded-full bg-slate-700 hover:bg-[rgb(40,51,69)]"
			>
				<Icon name="down-arrow" />
			</div>
		</button>
	{/if}
</div>
