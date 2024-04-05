<script lang="ts">
	export let characters;

	// $:console.log(characters);
</script>

{#if characters.length === 0}
	<p>None</p>
{:else}
	<div class="grid grid-cols-4 md:grid-cols-8 max-w-4xl mx-auto">
		{#each characters as chara}
			<div>
				{chara.appellation}
			</div>
		{/each}
	</div>
{/if}
