<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach((element) => {
			element.contentWindow.postMessage(
				JSON.stringify({ event: 'command', func: 'stopVideo' }),
				'*'
			);
		});
	}
</script>

<script>
	import { onMount } from 'svelte';

	export let route;

	let iframe;
	onMount(() => {
		elements.add(iframe);
		return () => elements.delete(iframe);
	});
</script>

<iframe
	bind:this={iframe}
	src={`https://www.youtube-nocookie.com/embed/${route.id}?rel=0&enablejsapi=1`}
	frameBorder="0"
	allowFullScreen
/>

<style>
	iframe {
		width: 100vw;
		aspect-ratio: 1062/600;
	}

	@media only screen and (min-width: 768px) {
		iframe {
			width: 40rem;
			height: 360px;
		}
	}
</style>
