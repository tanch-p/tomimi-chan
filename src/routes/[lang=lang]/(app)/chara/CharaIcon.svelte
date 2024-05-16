<script lang="ts">
	import { charaAssets } from '$lib/data/chara/chara_assets';
	export let chara;
</script>

<div class="relative">
	<div class="absolute top-0 left-0 bg-[#1f1f1f]">
		<img src={charaAssets[chara.profession]} alt={chara.profession} width="26" loading="lazy" decoding="async"/>
	</div>
	<img
		src={charaAssets[chara.rarity]}
		alt={chara.rarity}
		class="absolute bottom-0 right-0 h-[20px]"
	/>
	<img src={chara.icon} width="100" height="100" alt={chara.appellation} />
</div>
