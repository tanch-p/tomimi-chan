<script lang="ts">
	import DLDGPN from '$lib/images/is/DLDGPN.webp';
	import enemyCount from '$lib/images/is/enemy_count.webp';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';
	import translations from "$lib/translations.json"

	export let spEnemyInfo, language;
</script>

<div class="flex justify-center items-center gap-x-1 mt-6 mb-4">
	<img
		src={DLDGPN}
		height="75px"
		width="75px"
		decoding="async"
		loading="lazy"
		alt="sp enemy"
		class="bg-[#0a0a0a]"
	/>
	<img src={enemyCount} alt="enemy count" decoding="async" loading="lazy" class="" />
	<div class="flex flex-col gap-y-2">
		<div class="flex gap-x-2">
			{#if spEnemyInfo.elite && !(spEnemyInfo.normal == spEnemyInfo.elite)}
				<img
					src={combat_icon}
					width="40px"
					decoding="async"
					loading="lazy"
					alt="combat ops"
					class=""
				/>
			{/if}
			<span class="">{spEnemyInfo.normal}</span>
			{#if !spEnemyInfo.fixed}
				<span>{translations[language].sp_enemy_sure}</span>
			{/if}
		</div>
		{#if spEnemyInfo.elite && !(spEnemyInfo.normal == spEnemyInfo.elite)}
			<div class="flex gap-x-2">
				<img
					src={emergency_icon}
					width="40px"
					decoding="async"
					loading="lazy"
					alt="combat ops"
					class=""
				/>
				<span class="">{spEnemyInfo.elite}</span>
				{#if !spEnemyInfo.fixed}
					<span>{translations[language].sp_enemy_sure}</span>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	span {
		font-weight: 500;
		font-size: 1.5rem /* 24px */;
		line-height: 2rem /* 32px */;
	}
</style>
