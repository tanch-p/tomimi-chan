<script lang="ts">
	export let line: string,
		className: string = '';
	const patternsToIgnore = [
		'<ba.magicfragile>',
		'<ba.fragile>',
		'<ba.elementfragile>',
		'<ba.camou>',
		'<ba.invisible>',
		'<ba.steal>',
		'<ba.stun>',
		'<ba.sluggish>',
		'<ba.root>',
		'<ba.sleep>',
		'<ba.tremble>',
		'<ba.cold>',
		'<ba.frozen>',
		'<ba.levitate>',
		'<ba.weightless>',
		'<ba.debuff>',
		'<ba.epbarrier>',
		'<ba.protect>',
		'<ba.dying>',
		'<ba.dt.element>',
		'<ba.berserk>',
		'<ba.inspire>',
		'<ba.strong>',
		'<ba.barrier>',
		'<ba.shield>',
		'<ba.buffres>',
		'<ba.physhield>',
		'<ba.charged>',
		'<ba.overdrive>',
		'<ba.dt.apoptosis2>',
		'<ba.dt.burning2>',
		'<ba.weaken>',
		'<ba.binding>',
		'<@ba.dt.element>'
	];
	const patternsToParse = [
		{ prefix: '<@rolv.rem>', suffix: '</>', style: 'text-[#FF4C22]' },
		{ prefix: '<@ba.talpu>', suffix: '</>', style: 'text-[#0098DC]' },
		{ prefix: '<@ba.vup>', suffix: '</>', style: 'text-[#20a8EC]' },
		{ prefix: '<@ba.vdown>', suffix: '</>', style: 'text-[#FF6237]' },
		{ prefix: '<@ba.rem>', suffix: '</>', style: 'text-[#F49800]' },
		{ prefix: '<@ba.kw>', suffix: '</>', style: 'text-[#00B0FF]' },
		{ prefix: '#b', suffix: 'b#', style: 'text-[#20a8EC]' },
		{ prefix: '$', suffix: '$', style: 'text-red-400 font-semibold' }
	];
	//due to a difference in resolving <@rolv.rem> in rogue3_b-3-b and rogue3_b-4-b, this should be written to resolve by patterns first.
	const parseText = (line: string) => {
		for (const pattern of patternsToIgnore) {
			const regex = new RegExp(`${pattern}(.*?)</>`, 'gs');
			const splitText = line.split(regex);
			if (splitText.length > 1) {
				splitText.forEach((text, i) => i % 2 === 1 && (line = line.replace(regex, text)));
			}
		}

		const lines = [{ text: line, style: null }];
		for (const pattern of patternsToParse) {
			traverseLines(lines, pattern);
		}
		return splitNewLines(lines.flat(10)).filter((ele) => Boolean(ele.text));
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
				curr.text = curr.text.replaceAll('\\n', '\n');
				if (curr.text.includes('\n')) {
					const parts = curr.text.split('\n');
					for (let i = 0; i < parts.length; i++) {
						acc.push({ text: parts[i], style: curr.style });
						if (parts[i + 1] !== undefined) {
							acc.push({ text: '\n', style: null });
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
