<script lang="ts">
	export let description, blackboard;
	$: fullDesc = description;
	$: if (blackboard) {
		let tempDesc = description;
		for (const key in blackboard) {
			if (key === 'atk') {
				tempDesc = tempDesc.replace(`<${key}>`, blackboard[key] * 100);
			}
			tempDesc = tempDesc.replace(`<${key}>`, blackboard[key]);
		}
		fullDesc = tempDesc;
	}
</script>

<td class="border border-gray-400 px-2">{fullDesc}</td>
