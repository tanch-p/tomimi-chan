<script lang="ts">
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import favicon from '$lib/images/favicon.webp';
	export let language: string;
</script>

<header class="bg-[#161417] text-near-white">
	<div class="grid grid-cols-3 items-center max-w-6xl mx-auto">
		<div>
			<a href={`/${language}`} class="text">
				<span class="mx-1">
					<img src={favicon} width="32px" alt="favicon" />
				</span>
				<span class="hidden md:block">tomimi.dev</span></a
			>
		</div>
		<nav>
			<ul>
				<li>
					<a href={`/${language}/about`}>About</a>
				</li>
				<li>
					<a href={`/${language}/credits`}>Credits</a>
				</li>
			</ul>
		</nav>
		<div class="flex justify-end pr-2">
			<LanguageSwitcher />
		</div>
	</div>
</header>

<style>
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		gap: 0 0.5rem;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	.text {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1rem;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}

	nav a:hover {
		color: var(--color-theme-1);
	}
</style>
