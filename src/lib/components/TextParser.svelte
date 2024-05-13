<script lang="ts">
	export let line: string, className: string;

	const patternsToParse = [
		{ prefix: '<@rolv.rem>', suffix: '</>', style: 'text-[#FF4C22]' },
		{ prefix: '<@ba.talpu>', suffix: '</>', style: 'text-[#0098DC]' },
		{ prefix: '<@ba.vup>', suffix: '</>', style: 'text-[#20a8EC]' },
		{ prefix: '<@ba.vdown>', suffix: '</>', style: 'text-[#FF6237]' },
		{ prefix: '<@ba.rem>', suffix: '</>', style: 'text-[#F49800]' },
		{ prefix: '<@ba.kw>', suffix: '</>', style: 'text-[#00B0FF]' },
		{ prefix: '<ba.stun>', suffix: '</>', style: '' },
		{ prefix: '$', suffix: '$', style: 'text-red-400 font-semibold' }
	];
	//due to a difference in resolving <@rolv.rem> in rogue3_b-3-b and rogue3_b-4-b, this should be written to resolve by patterns first.
	const parseText = (line: string) => {
		const lines = [{ text: line, style: null }];
		for (const pattern of patternsToParse) {
			traverseLines(lines, pattern);
		}
		return lines.flat(10).filter((ele) => Boolean(ele.text));
	};
	const traverseLines = (arr, pattern) => {
		arr.forEach((ele, index) => {
			if (Array.isArray(ele)) {
				traverseLines(ele, pattern);
			} else {
				if (ele.style === null) {
					arr[index] = splitText(ele.text, pattern);
				}
			}
		});
	};
	const splitNewLines = (lines: string[]) => {
		return lines
			.reduce((acc, curr) => {
				if (curr.text.includes('\n')) {
					const parts = curr.text.split('\n');
					for (let i = 0; i < parts.length - 1; i++) {
						acc.push({ text: parts[i], style: curr.style });
						acc.push({ text: '\n', style: null });
						if (parts[i + 1]) {
							acc.push({ text: parts[i + 1], style: curr.style });
						}
					}
				} else {
					acc.push(curr);
				}
				return acc;
			}, [])
			.filter((ele) => Boolean(ele.text));
	};
	const splitText = (string: string, pattern) => {
		let returnArr = [];
		const { prefix, suffix, style } = pattern;
		if (prefix === suffix) {
			const splitText = string.split(prefix);
			splitText.forEach((text, index) => {
				if (index % 2 === 0) {
					returnArr.push({ text, style: null });
				} else returnArr.push({ text, style });
			});
		} else {
			const pattern = new RegExp(`${prefix}(.*?)${suffix}`, 'gs');
			const parts = string.split(pattern);
			returnArr = parts.map((text, i) => (i % 2 === 0 ? { text, style: null } : { text, style }));
		}
		returnArr = splitNewLines(returnArr);

		return returnArr;
	};
	$: parsedTextArray = parseText(line);
	// $: console.log(parsedTextArray);
</script>

<p class={className}>
	{#each parsedTextArray as { text, style }}
		{#if text === '\n'}
			<br />
		{:else}
			<span class={style}> {text}</span>
		{/if}
	{/each}
</p>
