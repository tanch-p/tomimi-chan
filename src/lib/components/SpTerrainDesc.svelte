<script lang="ts">
	export let description: string[], blackboard;

	//temp hack before the format for spTerrain replacement is sorted out
	const percentKeys = ['atk', 'atk_scale', 'HP_RECOVERY_PER_SEC_BY_MAX_HP_RATIO'];

	$: fullDesc = description;
	$: if (blackboard) {
		fullDesc = description.map((line) => {
			let temp = line;
			for (const key in blackboard) {
				if (percentKeys.includes(key)) {
					temp = temp.replace(`<${key}>`, blackboard[key] * 100);
				} else {
					temp = temp.replace(`<${key}>`, blackboard[key]);
				}
			}
			return temp;
		});
	}
</script>

<td class="border border-gray-400 px-2 py-1.5">
	{#each fullDesc as line}
		<p>{line}</p>
	{/each}
</td>
