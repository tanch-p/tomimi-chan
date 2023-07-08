<script>
	export let resolution, stunTimings;

	$: parsedStunTimings = parseStunTimings(stunTimings);
	function parseStunTimings(stunTimings) {
		let acc = [];
		acc.push({ key: 'blank', value: stunTimings[0].i, counter: stunTimings[0].counter });
		let initial2Hit = stunTimings[0].counter;
		for (let i = 1; i < stunTimings.length; i++) {
			if (stunTimings[i].counter < stunTimings[i - 1].counter) {
				acc.push({
					key: 'stun',
					value: stunTimings[i - 1].counter + stunTimings[i - 1].value - initial2Hit
				});
				acc.push({
					key: 'blank',
					value: stunTimings[i].i - (stunTimings[i - 1].i + stunTimings[i - 1].value)
				});
				initial2Hit = stunTimings[i].counter;
			}
		}
		if (acc[acc.length - 1].key !== 'stun') {
			acc.push({
				key: 'stun',
				value:
					stunTimings[stunTimings.length - 1].counter +
					stunTimings[stunTimings.length - 1].value -
					initial2Hit
			});
		}
		return acc;
	}
</script>

<div class="flex w-max">
	{#each parsedStunTimings as { key, value }}
		<div class="flex flex-col">
			<div
				class={`flex items-center justify-center h-[24px] border-black text-sm font-bold ${
					key === 'blank' ? '' : 'bg-[#8d2828] border-r text-near-white'
				}`}
				style={`width: ${value * resolution}px;`}
			>
				{value}
			</div>
		</div>
	{/each}
</div>
