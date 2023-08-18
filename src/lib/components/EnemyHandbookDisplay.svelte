<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import EnemyHandbookDetails from './EnemyHandbookDetails.svelte';

	export let enemies: Enemy[], language: Language, statMods, specialMods;
</script>

<div class="grid grid-cols-[80px_auto]">
	<div
		class="grid grid-flow-row auto-rows-max gap-2.5 px-2.5 h-[calc(100vh-172px)] overflow-scroll no-scrollbar sticky top-20"
	>
		{#each enemies as enemy}
			<a href={`#${enemy.key}`}>
				<div class="relative">
					<p class="absolute bg-black px-1 text-xs">{enemy.id}</p>
					<img
						class="select-none"
						src={enemy.img}
						height="60px"
						width="60px"
						decoding="async"
						alt={enemy.id}
					/>
				</div>
			</a>
		{/each}
	</div>
	<div class="flex flex-col">
		{#each enemies as enemy, index (enemy.key)}
			<EnemyHandbookDetails {enemy} {language} {statMods} {specialMods} />
		{/each}
	</div>
</div>
