<script lang="ts">
	export let line: string;

	const patternsToParse = [
		{ prefix: '<@rolv.rem>', suffix: '</>', style: 'text-[#FF4C22]' },
		{ prefix: '$', suffix: '$', style: 'text-red-400' }
	];

	const parseText = (line: string) => {
		const returnArr = [{ text: line, style: null }];
		for (const pattern of patternsToParse) {
			traverseLines(returnArr, pattern);
		}
		return returnArr.flat(10).filter((ele) => Boolean(ele.text));
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

	const splitText = (string: string, pattern) => {
		const returnArr = [];
		const { prefix, suffix, style } = pattern;
		if (prefix === suffix) {
			const splitText = string.split(prefix);
			splitText.forEach((text, index) => {
				if (index % 2 === 0) {
					returnArr.push({ text, style: null });
				} else returnArr.push({ text, style });
			});
		} else {
			let startIndex = 0;
			startIndex = string.indexOf(prefix, startIndex);
			if (startIndex === -1) {
				returnArr.push({ text: string, style: null });
			} else {
				const endIndex = string.indexOf(suffix, startIndex);
				const extractedSubstring = string.substring(startIndex + prefix.length, endIndex);
				returnArr.push({ text: string.substring(0, startIndex), style: null });
				returnArr.push({ text: extractedSubstring, style });
				returnArr.push({ text: string.substring(endIndex + suffix.length), style: null });
			}
		}
		return returnArr;
	};

	$: parsedTextArray = parseText(line);
</script>

<p>
	{#each parsedTextArray as { text, style }}
		<span class={style}> {text}</span>
	{/each}
</p>
