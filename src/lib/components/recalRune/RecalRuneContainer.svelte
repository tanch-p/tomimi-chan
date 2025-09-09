<script lang="ts">
	import type { Language } from '$lib/types';
	import TogglePanel from '../TogglePanel.svelte';
	import ContractDesc from './ContractDesc.svelte';
	import ContractScore from './ContractScore.svelte';
	import ContractSelector from './ContractSelector.svelte';
	import translations from '$lib/translations.json';

	export let language: Language, crisis, contracts;

	let containerEle,
		height = '60vh';

	$: if (crisis && containerEle) {
		setTimeout(() => {
			height = `${containerEle?.scrollHeight}px`;
		}, 100);
	}
</script>

<TogglePanel
	title={translations[language].contract_list}
	size="subheading"
	isOpen={true}
	className="my-3"
>
	<div class="flex flex-wrap md:flex-nowrap">
		<div bind:this={containerEle} class="flex flex-col h-min">
			<ContractSelector {contracts} />
			<ContractScore {language} {contracts} />
		</div>
		<div class="w-full bg-[#1b1b1b] max-h-[60vh] md:max-h-full overflow-y-auto" style:height>
			<ContractDesc {language} {crisis} {contracts} />
		</div>
	</div>
</TogglePanel>
