<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import EnemyHandbookDetails from './EnemyHandbookDetails.svelte';
	import bossIcon from '$lib/images/is/boss_icon.webp';

	export let enemies: Enemy[], language: Language, specialMods,otherBuffsList,mode="mobile";
</script>

<div class="grid grid-cols-[80px_auto] md:justify-center md:mt-4">
	<div
		class="grid grid-flow-row auto-rows-max gap-2.5 px-2.5 h-[calc(100vh-172px)] overflow-scroll no-scrollbar sticky top-20"
	>
		{#each enemies as enemy}
			<a href={`#${enemy.stageId}`}>
				<div class="relative">
					<p class="absolute bg-almost-black px-1 text-xs">{enemy.id}</p>
					{#if enemy.type.includes('BOSS')}
						<img
							class="absolute bottom-0 opacity-70"
							src={bossIcon}
							width="30px"
							height="30px"
							decoding="async"
							alt=""
						/>
					{/if}
					<img
						class="select-none"
						src={`/images/enemy_icons/${enemy.key}.webp`}
						height="60px"
						width="60px"
						decoding="async"
						alt={enemy.id}
					/>
				</div>
			</a>
		{/each}
	</div>
	<div class="flex flex-col md:max-w-[550px]">
		{#each enemies as enemy, index (enemy.stageId)}
			{#if index !== 0}
				<div class="bg-neutral-700 mx-1 h-0.5" />
			{/if}
			<EnemyHandbookDetails {enemy} {language} {specialMods} {otherBuffsList} {mode}/>
		{/each}
	</div>
</div>
