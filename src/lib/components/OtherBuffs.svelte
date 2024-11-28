<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import {
		getApplicableBuffsList,
		getOtherBuffsCount,
		updateOtherBuffsList
	} from '$lib/functions/lib';

	export let language: Language, otherBuffsList, entity;

	$: applicableBuffsList = getApplicableBuffsList($otherBuffsList, entity);
</script>

{#if applicableBuffsList?.length > 0}
	<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
		{translations[language].other_buffs}
	</p>
	<div class="grid grid-cols-3 justify-items-center py-2">
		{#each applicableBuffsList as buff}
			{@const currentCount = getOtherBuffsCount($otherBuffsList, buff.key, entity.key)}
			<button
				class:brightness-50={currentCount === 0}
				class="flex flex-col items-center gap-y-1"
				on:click={() => updateOtherBuffsList(otherBuffsList, buff.key, entity.key)}
			>
				<div class="relative">
					{#if buff.maxCount > 1 && currentCount > 0}
						<p class="absolute right-0 bottom-0 bg-almost-black px-1 text-xs">x{currentCount}</p>
					{/if}
					<img src={buff.img} alt={buff.name} width="60" height="60" />
				</div>
				<p
					class={language !== 'en'
						? 'text-center max-w-[90px] w-full whitespace-nowrap'
						: 'text-sm'}
				>
					{buff.name}
				</p>
			</button>
		{/each}
	</div>
{/if}
