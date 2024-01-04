<script lang="ts">
	import TextParser from './TextParser.svelte';
	export let text: string,
		position = 'bottom';

	const positionStyles = {
		top: 'bottom-full',
		bottom: ''
	};
</script>

<div
	class={`absolute hidden group-hover:block left-[50%] -translate-x-[50%] bg-slate-300 text-[#222222] w-[220px] p-1.5 z-[1] rounded-md text-sm shadow-md ${positionStyles[position]}`}
>
	<TextParser line={text} />
</div>
