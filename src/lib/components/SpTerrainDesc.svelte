<script lang="ts">
	export let description: string[], blackboard;
	$: fullDesc = description;
	$: if (blackboard) {
		fullDesc = description.map((line) => {
			let temp = line;
			for (const key in blackboard) {
				if (key === 'atk') {
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
