<script lang="ts">
	import type { Language, Trap } from '$lib/types';
	import TogglePanel from './TogglePanel.svelte';
	import translations from '$lib/translations.json';
	import TrapHandbookDetails from './TrapHandbookDetails.svelte';
	import MediaQuery from './MediaQuery.svelte';
	import TrapTable from './TrapTable.svelte';

	export let language: Language, traps: Trap[], otherBuffsList;
</script>

{#if traps?.length > 0}
	<TogglePanel
		title={translations[language].trap}
		isOpen={false}
		size="subheading"
		className="my-4"
	>
		<MediaQuery>
			<div class="grid grid-cols-[80px_auto] sm:flex flex-col" slot="mobile">
				<div
					class="grid grid-flow-row sm:flex auto-rows-max gap-2.5 px-2.5 h-[calc(100vh-172px)] sm:h-auto overflow-scroll no-scrollbar sticky sm:static top-20"
				>
					{#each traps as trap}
						<a href={`#${trap.key}${trap.ops ? '_' + trap.ops : ''}`}>
							<div class="relative">
								<img
									class="select-none"
									src={trap.img}
									height="60px"
									width="60px"
									decoding="async"
									alt={trap.name}
								/>
							</div>
						</a>
					{/each}
				</div>
				<div class="flex flex-col">
					{#each traps as trap, index}
						{#if index !== 0}
							<div class="bg-neutral-700 mx-1 h-0.5" />
						{/if}
						<TrapHandbookDetails {trap} {otherBuffsList} />
					{/each}
				</div>
			</div>
			<TrapTable {traps} {language} slot="pc" />
		</MediaQuery>
	</TogglePanel>
{/if}
