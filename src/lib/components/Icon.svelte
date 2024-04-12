<!--@component
use an svg icon that was provided through `Icons.svelte` from
- https://github.com/jacobmischka/svelte-feather-icon
- https://feathericons.com/
-->
<script>
	/** @type {string} */
	export let name, className="";
	/** @type {string | number} */
	export let size = 24;
</script>

<svg width={size} height={size} class={className}>
	<use xlink:href="#{name}" />
</svg>