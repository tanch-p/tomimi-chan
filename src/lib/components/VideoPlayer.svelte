<script lang="ts">
	export let route, language: string;
</script>

{#if language === 'zh' && route.bilibili_src}
	<iframe
		src="//player.bilibili.com/player.html?{route.bilibili_src}&autoplay=0&high_quality=1&danmaku=0"
		frameBorder="0"
		allowFullScreen
	/>
{/if}
<iframe
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
