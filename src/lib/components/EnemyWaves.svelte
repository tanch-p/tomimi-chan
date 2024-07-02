<script lang="ts">
	import translations from '$lib/translations.json';
	import DLD from '$lib/images/enemy_icons/icon_enemy_2001_duckmi.webp';
	import GPN from '$lib/images/enemy_icons/icon_enemy_2002_bearmi.webp';
	import THF from '$lib/images/enemy_icons/icon_enemy_2034_sythef.webp';
	import sami_smbox from '$lib/images/is/sami/sktok_smbox.webp';
	import sami_smrbox from '$lib/images/is/sami/sktok_smrbox.webp';
	import sami_smbbox from '$lib/images/is/sami/sktok_smbbox.webp';

	export let mapConfig, rogueTopic: string, language: string, selectedFloor;

	$: isBossStage = mapConfig.id.includes('_b_');
	$: isEventStage = mapConfig.id.includes('_ev_') || mapConfig.id.includes('_t_');
	$: isCombatStage = !isBossStage && !isEventStage;
</script>

{#if isCombatStage}
	<div class="sm:px-6 my-4">
		<h2 class="px-2 sm:px-0 text-subheading mt-4">{translations[language].hidden_enemy_prob}</h2>
		<hr class="border-gray-500 my-1" />
		<div class="flex flex-col gap-y-4 px-2 sm:px-0">
			<div class="flex items-center">
				<img src={DLD} width="50px" alt="DLD" /> <span>5%</span>
				<img src={GPN} width="50px" alt="GPN" /> <span>5%</span>
				{#if rogueTopic !== 'rogue_phantom'}
					<img src={THF} width="50px" alt="THF" /> <span>5%</span>
				{/if}
			</div>
			{#if rogueTopic !== 'rogue_phantom'}
				<div class="flex items-center">
					<img src={sami_smbox} width="50px" alt="smbox" /> <span>10.5%</span>
					<img src={sami_smrbox} width="50px" alt="smrbox" /> <span>3%</span>
					<img src={sami_smbbox} width="50px" alt="smbbox" /> <span>1.5%</span>
				</div>
			{/if}
		</div>
		<p class="mt-4">* - {translations[language].enemy_prob_dev}</p>
	</div>
{/if}

<style>
	span {
		margin: 0px 10px;
	}
</style>
