<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	let showButton: Boolean = false;
	onMount(() => {
		if (window) {
			window.onscroll = function () {
				showButton = document.body.scrollTop > 700 || document.documentElement.scrollTop > 700;
			};
		}
	});
</script>

<div class="fixed max-w-[1280px] mx-auto inset-0 z-50 pointer-events-none">
	<button
		hidden={!showButton}
		class="absolute bottom-[90px] right-[20px] md:right-[40px] pointer-events-auto"
		on:click={() => window.scrollTo(0, 0)}
		id="scroll-top-button"
	>
		<div
			class="flex items-center justify-center h-[45px] w-[45px] rounded-full bg-slate-700 hover:bg-[rgb(40,51,69)]"
		>
			<Icon name="down-arrow" className="rotate-180" />
		</div>
	</button>
</div>
