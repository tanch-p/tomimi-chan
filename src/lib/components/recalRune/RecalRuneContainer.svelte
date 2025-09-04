<script lang="ts">
	import type { Language } from '$lib/types';
	import TogglePanel from '../TogglePanel.svelte';
	import ContractDesc from './ContractDesc.svelte';
	import ContractScore from './ContractScore.svelte';
	import ContractSelector from './ContractSelector.svelte';
	import translations from '$lib/translations.json';

	export let language: Language, crisis, contracts;
</script>

<TogglePanel
	title={translations[language].contract_list}
	size="subheading"
	isOpen={true}
	className="my-3"
>
	<div class="flex flex-wrap md:flex-nowrap md:h-[60vh]">
		<div class="flex flex-col">
			<ContractSelector {contracts} />
			<ContractScore {language} {contracts} />
		</div>
		<ContractDesc {language} {crisis} {contracts} />
	</div>
</TogglePanel>
