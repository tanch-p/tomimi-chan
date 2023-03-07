<script lang="ts">
	import { selectedRelics } from './stores';
	import relicIcon from '$lib/images/is/relic.png';
	import RelicsOverlay from './RelicsOverlay.svelte';
	import translations from '$lib/translations.json';
	export let language: string, rogueTopic: string;
	let openOverlay = false;

	async function getRelics(rogueTopic: string) {
		let relics = (await import(`../../../../../lib/data/relics_${rogueTopic}.json`)).default;
		for (const relic of relics) {
			relic.src = (await import(`../../../../../lib/images/relics/r_${relic.img}.webp`)).default;
		}
		return relics;
	}
	$: promise = getRelics(rogueTopic);
</script>

<div class="fixed overflow-hidden bottom-0 w-full select-none z-[2]">
	{#await promise then relics}
		<RelicsOverlay {openOverlay} {language} {relics} />
	{/await}
	<div class="shadow-2xl shadow-gray-400 bg-neutral-900 w-full mt-4 fixed bottom-0 py-2">
		<div class="max-w-7xl mx-auto px-2 md:px-4">
			<div class="relative flex items-center justify-between h-16 ">
				<div
					class={`flex items-center py-[2px] bg-gradient-to-r from-[#333333] via-neutral-900 to-neutral-900 relative hover:cursor-pointer`}
					on:click={() => (openOverlay = !openOverlay)}
				>
					<div class="flex items-center px-[6px] py-1 relative bg-[#313131]">
						{#if openOverlay}
							<div
								class="absolute flex flex-col inset-0 bg-[#212121] bg-opacity-70 text-center justify-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="3"
									stroke="#F2F2F2"
									class="w-6 h-6 mx-auto"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
									/>
								</svg>
								<p class="font-medium text-near-white">
									{translations[language]['relic_overlay_close']}
								</p>
							</div>
						{/if}
						<img src={relicIcon} alt="relic icon" decoding="async" />
					</div>
					<div
						class="bg-neutral-900 min-w-[280px] w-[80vw] md:w-auto overflow-hidden h-14 gap-x-2 pl-1"
					>
						<div class="flex gap-x-2 items-center">
							{#each $selectedRelics as relic, i}
								<div class="relative flex items-center">
									<div
										class="absolute rounded-full border-[3px] border-neutral-600 border-opacity-80 left-[50%] w-[44px] h-[44px] -translate-x-[50%]"
									/>
									<div class="flex items-center text-center w-14 z-[1]">
										<img src={relic.src} width="54px" alt={relic.name_zh} />
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
				<div class="mt-2 hidden md:block" />
			</div>
		</div>
	</div>
</div>
