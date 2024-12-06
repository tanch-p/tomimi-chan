<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import translations from '$lib/translations.json';

	export let enemy: Enemy, skills, language: Language;
</script>

{#if skills.length > 0}
	<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
		{translations[language].skill}
	</p>
	<div class="py-1">
		<div class="flex gap-x-2.5">
			<p>{skill.name[language]}</p>
		</div>
		<div class="flex mt-1.5 text-sm">
			{#if skill.skillType !== 'PASSIVE'}
				<p class="pill default {skill?.spType}">
					{translations[language][skill?.spType]}
				</p>
			{/if}
			<p class="pill default bg-[#737373]">{translations[language][skill.skillType]}</p>
			{#if skill?.duration > 0}
				<div class="pill default grid grid-cols-[20px_1fr] gap-x-0.5 items-center bg-[#555]">
					<Icon name="clock-icon" size={20} />
					<span>{skill?.duration}{language === 'en' ? 's' : '秒'}</span>
				</div>
			{/if}
		</div>
		<div class="flex gap-x-2.5">
			<TextParser line={parseValues(skill, skill.desc, mode)} className="mt-1.5" />
			{#if skill.rangeId}
				<div
					class="flex flex-col items-center justify-center min-w-[72px] h-max min-h-[60px] p-2 pb-1 bg-[#161616] bg-opacity-80 rounded"
				>
					<div class="flex items-center h-full">
						<RangeParser rangeId={skill.rangeId} size="small" />
					</div>
					<p class="mt-1 text-xs">{translations[language].effect_range}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
