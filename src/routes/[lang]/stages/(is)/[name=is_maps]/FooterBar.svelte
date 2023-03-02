<script lang="ts">
	import { selectedRelics } from './stores';
	import relicIcon from '$lib/images/is/relic.png';
	import RelicsOverlay from './RelicsOverlay.svelte';
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

<div class="fixed overflow-hidden bottom-0 w-full select-none">
	{#await promise then relics}
		<RelicsOverlay {openOverlay} {language} {relics} />
	{/await}
	<div class="shadow-2xl shadow-gray-400 bg-neutral-900 w-full mt-4 fixed bottom-0 py-2 z-[30]">
		<div class="max-w-7xl mx-auto px-2 md:px-4">
			<div class="relative flex items-center justify-between h-16 ">
				<div
					class="flex items-center py-[2px] bg-gradient-to-r from-[#333333] via-neutral-900 to-neutral-900 relative hover:cursor-pointer mx-auto sm:mx-0"
					on:click={() => (openOverlay = !openOverlay)}
				>
					<div class="flex items-center px-[6px] py-1 relative">
						<img src={relicIcon} alt="relic icon" decoding="async" />
					</div>
					<div class="bg-neutral-900 w-[280px] overflow-hidden h-14 gap-x-2 pl-1">
						<div class="flex gap-x-2 items-center">
							<!-- {relicsArr.map((img, index) =>
											index < 5 ? (
												<div
													class="relative flex items-center"
													key={`small-${img}`}
												>
													<div class="absolute rounded-full border-[3px] border-neutral-600  border-opacity-80 left-[50%] w-[44px] h-[44px] -translate-x-[50%]"></div>
													<div class="flex items-center text-center">
														<Image
															src={`/images/phcs/${img}.png`}
															width="54px"
															height="54px"
															layout="fixed"
															alt="relic"
														/>
													</div>
												</div>
											) : null
										)} -->
						</div>
					</div>
				</div>
				<div class="mt-2 hidden md:block" />
			</div>
		</div>
	</div>
</div>