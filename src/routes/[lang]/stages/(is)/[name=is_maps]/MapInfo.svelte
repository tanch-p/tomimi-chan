<script lang="ts">
	import DLDGPN from '$lib/images/is/DLDGPN.webp';
	import enemyCount from '$lib/images/is/enemy_count.webp';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';
	import boss_icon from '$lib/images/is/boss_icon.webp';
	import lumen from '$lib/images/is/lumen.webp';

	export let mapConfig;
</script>

<div>
	<div class="mt-2 text-xl w-[100vw] md:w-max mx-auto ">
		<div class="w-[100vw] md:w-full">
			{#if mapConfig.sp_enemy}
				<div class="flex justify-center items-center gap-x-1 my-4">
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
							{#if mapConfig.sp_enemy.elite}
								<img
									src={combat_icon}
									width="40px"
									decoding="async"
									loading="lazy"
									alt="combat ops"
									class=""
								/>
							{/if}
							<span class="">{mapConfig.sp_enemy.normal}</span>
							{#if !mapConfig.sp_enemy.fixed}
								<span> - 100%</span>
							{/if}
						</div>
						{#if mapConfig.sp_enemy.elite}
							<div class="flex gap-x-2">
								<img
									src={emergency_icon}
									width="40px"
									decoding="async"
									loading="lazy"
									alt="combat ops"
									class=""
								/>
								<span class="">{mapConfig.sp_enemy.elite}</span>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	span {
		font-weight: 500;
		font-size: 1.5rem /* 24px */;
		line-height: 2rem /* 32px */;
	}
</style>
