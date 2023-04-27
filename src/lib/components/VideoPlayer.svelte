<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach((element) => {
			element.contentWindow.postMessage(
				JSON.stringify({ event: 'command', func: 'pauseVideo' }),
				'*'
			);
		});
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	export let route, language: string;

	let iframe;

	onMount(() => {
		elements.add(iframe);
		return () => elements.delete(iframe);
	});
</script>

{#if language === 'zh' && route.bilibili_src}
	<iframe
		src="//player.bilibili.com/player.html?{route.bilibili_src}&autoplay=0&high_quality=1&danmaku=0"
		frameBorder="0"
		allowFullScreen
	/>
{/if}
<iframe
	bind:this={iframe}
	class={language === 'zh' ? 'hidden' : ''}
	src={`https://www.youtube-nocookie.com/embed/${route.youtube_src}?rel=0&enablejsapi=1`}
	frameBorder="0"
	allowFullScreen
/>

<style>
	iframe {
		width: 100vw;
		aspect-ratio: 1062/600;
	}

	@media only screen and (min-width: 640px) {
		iframe {
			width: 40rem;
			height: 360px;
		}
	}
</style>
