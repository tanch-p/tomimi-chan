<script lang="ts">
	export let line: string;

	const parseText = (text: string) => {
		const returnArr = [];
		if (text.includes('$')) {
			const splitText = text.split('$');
			splitText.forEach((text, index) => {
				if (index % 2 === 0) {
					returnArr.push({ text, highlight: null });
				} else returnArr.push({ text, highlight: 'red' });
			});
		}
		return returnArr;
	};
	const hasHighlight = (text: string) => {
		return text.includes('$');
	};
</script>

{#if hasHighlight(line)}
	{@const parsedTextArray = parseText(line)}
	<p>
		{#each parsedTextArray as { text, highlight }}
			{#if highlight === 'red'}
				<span class="text-red-400 font-medium"> {text}</span>
			{:else}
				{text}
			{/if}
		{/each}
	</p>
{:else}
	<p>{line}</p>
{/if}
