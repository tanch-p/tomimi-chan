<script lang="ts">
	export let characters;

	// $:console.log(characters);
</script>

<div class="max-w-4xl mx-auto">
	{#if characters.length === 0}
		<p class="text-center">No results found</p>
	{:else}
		<p>{characters.length} results returned</p>
		<div class="grid grid-cols-4 md:grid-cols-8 mt-4">
			{#each characters as chara}
				<div>
					{chara.appellation}
				</div>
			{/each}
		</div>
	{/if}
</div>
