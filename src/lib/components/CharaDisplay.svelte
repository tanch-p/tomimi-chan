<script lang="ts">
	import Icon from './Icon.svelte';

	export let characters, selectedChara;
</script>

<div class="max-w-4xl mx-auto">
	<div class="flex items-center gap-x-4 w-max ml-auto">
		<div class="">
			<Icon name="grid-view" size={24} />
		</div>
		<div>
			<Icon name="icon-list" size={22} />
		</div>
	</div>
	{#if characters.length === 0}
		<p class="text-center">No results found</p>
	{:else}
		<p>{characters.length} results returned</p>
		<div class="grid grid-cols-4 md:grid-cols-8 mt-4">
			{#each characters as chara}
				<button on:click={() => selectedChara.set(chara)}>
					{chara.appellation}
				</button>
			{/each}
		</div>
	{/if}
</div>
