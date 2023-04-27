<script lang="ts">
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	export let language: string;
</script>

<header
	class="sticky top-0 w-screen sm:w-full transition-none bg-neutral-800 text-near-white py-4 z-[1]"
>
	<div class="grid grid-cols-3 max-w-7xl mx-auto sm:px-6">
		<div>
			<a href={`/${language}`} class="hover:underline">Home</a>
		</div>
		<slot name="floorTitle">
			<div />
		</slot>
		<div class="flex justify-end">
			<LanguageSwitcher />
		</div>
	</div>
</header>
