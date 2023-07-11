<script lang="ts">
	import type { Enemy } from '$lib/types';
	import translations from '$lib/translations.json';
	export let enemies: Enemy[], language: string, statMods, specialMods;

    const statKeys = ['hp','ms','atk','aspd','def','res'];
</script>

<div class="flex flex-col">
	{#each enemies as enemy, index (enemy.key)}
		<div>
			<div class="flex gap-x-2">
				{#each enemy.type.filter((ele) => ele !== 'NORMAL') as type}
					<p class="whitespace-nowrap">{translations[language].types[type]}</p>
				{/each}
			</div>
			<div class="flex items-center">
				<p>{enemy.id}</p>
				{#if enemy.statsOverwritten}
					<p>Sp.</p>
				{/if}
				<p>{enemy[`name_${language}`]}</p>
			</div>
			<div class="grid grid-cols-[100px_auto]">
				<div class="flex flex-col gap-y-2">
					<p>ATK type Dmg Element</p>
					<img
						class="select-none"
						src={enemy.img}
						height="75px"
						width="75px"
						decoding="async"
						alt={enemy.id}
					/>
					<div>
						I {translations[language].weight}
						{enemy[row].weight}
					</div>
				</div>
				<div>
					{#if enemy.lifepoint !== 1}
						<div class="flex items-center justify-between">lifepoint icon {enemy.lifepoint}</div>
					{/if}
                    <div class="grid grid-cols-2 gap-2">
                        {#each statKeys as statKey}
                            <div class="flex items-center">
                                icon {translations[language][statKey]} {enemy.stats[row][key]}
                            </div>
                        {/each}
                    </div>
				</div>
                <p>talent</p>
                <div>
                    
                </div>
			</div>
		</div>
	{/each}
</div>
