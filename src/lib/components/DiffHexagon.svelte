<script lang="ts">
	interface Props {
		difficulty: number;
	}

	type GradientStop = {
		offset: string;
		color: string;
		opacity?: number;
	};

	type RadialGradient = {
		cx: string;
		cy: string;
		r: string;
		stops: GradientStop[];
	};

	type Palette = {
		linear: {
			x1: string;
			y1: string;
			x2: string;
			y2: string;
			stops: GradientStop[];
		};
		radials: RadialGradient[];
		texture: {
			baseFrequency: string;
			seed: number;
			alpha: number;
			fill: string;
			opacity: number;
		};
		soften: number;
	};

	const lowPalette: Palette = {
		linear: {
			x1: '0',
			y1: '0.9',
			x2: '1',
			y2: '0.1',
			stops: [
				{ offset: '0%', color: '#545252' },
				{ offset: '34%', color: '#3f3f40' },
				{ offset: '68%', color: '#2b2d2e' },
				{ offset: '100%', color: '#181b1c' }
			]
		},
		radials: [
			{
				cx: '20%',
				cy: '22%',
				r: '42%',
				stops: [
					{ offset: '0%', color: '#8a8888', opacity: 0.34 },
					{ offset: '100%', color: '#8a8888', opacity: 0 }
				]
			},
			{
				cx: '76%',
				cy: '22%',
				r: '76%',
				stops: [
					{ offset: '0%', color: '#101313', opacity: 0.86 },
					{ offset: '100%', color: '#101313', opacity: 0 }
				]
			},
			{
				cx: '30%',
				cy: '82%',
				r: '58%',
				stops: [
					{ offset: '0%', color: '#454445', opacity: 0.3 },
					{ offset: '100%', color: '#454445', opacity: 0 }
				]
			}
		],
		texture: {
			baseFrequency: '0.019 0.025',
			seed: 27,
			alpha: 0.18,
			fill: '#191919',
			opacity: 0.11
		},
		soften: 1.1
	};

	const midPalette: Palette = {
		linear: {
			x1: '0',
			y1: '1',
			x2: '1',
			y2: '0',
			stops: [
				{ offset: '0%', color: '#778d59' },
				{ offset: '32%', color: '#546449' },
				{ offset: '66%', color: '#313833' },
				{ offset: '100%', color: '#181c1b' }
			]
		},
		radials: [
			{
				cx: '18%',
				cy: '80%',
				r: '62%',
				stops: [
					{ offset: '0%', color: '#8daa63', opacity: 0.82 },
					{ offset: '38%', color: '#739055', opacity: 0.54 },
					{ offset: '100%', color: '#597044', opacity: 0 }
				]
			},
			{
				cx: '82%',
				cy: '24%',
				r: '72%',
				stops: [
					{ offset: '0%', color: '#121614', opacity: 0.84 },
					{ offset: '100%', color: '#121614', opacity: 0 }
				]
			},
			{
				cx: '45%',
				cy: '72%',
				r: '56%',
				stops: [
					{ offset: '0%', color: '#56624b', opacity: 0.2 },
					{ offset: '100%', color: '#56624b', opacity: 0 }
				]
			}
		],
		texture: {
			baseFrequency: '0.018 0.022',
			seed: 31,
			alpha: 0.18,
			fill: '#1e221f',
			opacity: 0.1
		},
		soften: 1.2
	};

	const highPalette: Palette = {
		linear: {
			x1: '0',
			y1: '0.95',
			x2: '1',
			y2: '0.05',
			stops: [
				{ offset: '0%', color: '#9a5965' },
				{ offset: '34%', color: '#7e4b57' },
				{ offset: '68%', color: '#4d4347' },
				{ offset: '100%', color: '#26292b' }
			]
		},
		radials: [
			{
				cx: '24%',
				cy: '75%',
				r: '64%',
				stops: [
					{ offset: '0%', color: '#c07b88', opacity: 0.72 },
					{ offset: '40%', color: '#aa616f', opacity: 0.48 },
					{ offset: '100%', color: '#854955', opacity: 0 }
				]
			},
			{
				cx: '82%',
				cy: '18%',
				r: '72%',
				stops: [
					{ offset: '0%', color: '#191d1e', opacity: 0.72 },
					{ offset: '100%', color: '#191d1e', opacity: 0 }
				]
			},
			{
				cx: '18%',
				cy: '22%',
				r: '40%',
				stops: [
					{ offset: '0%', color: '#d0adb3', opacity: 0.28 },
					{ offset: '100%', color: '#d0adb3', opacity: 0 }
				]
			}
		],
		texture: {
			baseFrequency: '0.018 0.024',
			seed: 13,
			alpha: 0.16,
			fill: '#222',
			opacity: 0.09
		},
		soften: 1.2
	};

	const extremePalette: Palette = {
		linear: {
			x1: '0',
			y1: '1',
			x2: '1',
			y2: '0',
			stops: [
				{ offset: '0%', color: '#8b2532' },
				{ offset: '38%', color: '#551d28' },
				{ offset: '67%', color: '#302a2c' },
				{ offset: '100%', color: '#1f2221' }
			]
		},
		radials: [
			{
				cx: '43%',
				cy: '82%',
				r: '58%',
				stops: [
					{ offset: '0%', color: '#bf3441', opacity: 0.88 },
					{ offset: '38%', color: '#9a2735', opacity: 0.62 },
					{ offset: '100%', color: '#631d2a', opacity: 0 }
				]
			},
			{
				cx: '78%',
				cy: '25%',
				r: '70%',
				stops: [
					{ offset: '0%', color: '#111615', opacity: 0.82 },
					{ offset: '100%', color: '#111615', opacity: 0 }
				]
			},
			{
				cx: '10%',
				cy: '44%',
				r: '54%',
				stops: [
					{ offset: '0%', color: '#31535a', opacity: 0.34 },
					{ offset: '100%', color: '#31535a', opacity: 0 }
				]
			}
		],
		texture: {
			baseFrequency: '0.018 0.022',
			seed: 17,
			alpha: 0.18,
			fill: '#222',
			opacity: 0.1
		},
		soften: 1.2
	};

	let { difficulty }: Props = $props();
	const svgId = $props.id();
	let palette = $derived(
		difficulty <= 3
			? lowPalette
			: difficulty <= 9
				? midPalette
				: difficulty <= 11
					? highPalette
					: extremePalette
	);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 512 512"
	width="512"
	height="512"
	class="h-full w-full"
>
	<defs>
		<clipPath id="{svgId}-clip">
			<polygon points="256,20 456,136 456,376 256,492 56,376 56,136" />
		</clipPath>

		<linearGradient
			id="{svgId}-base"
			x1={palette.linear.x1}
			y1={palette.linear.y1}
			x2={palette.linear.x2}
			y2={palette.linear.y2}
		>
			{#each palette.linear.stops as stop}
				<stop offset={stop.offset} stop-color={stop.color} stop-opacity={stop.opacity ?? 1} />
			{/each}
		</linearGradient>

		{#each palette.radials as gradient, index}
			<radialGradient id="{svgId}-radial-{index}" cx={gradient.cx} cy={gradient.cy} r={gradient.r}>
				{#each gradient.stops as stop}
					<stop offset={stop.offset} stop-color={stop.color} stop-opacity={stop.opacity ?? 1} />
				{/each}
			</radialGradient>
		{/each}

		<filter id="{svgId}-texture" x="-15%" y="-15%" width="130%" height="130%">
			<feTurbulence
				type="fractalNoise"
				baseFrequency={palette.texture.baseFrequency}
				numOctaves="4"
				seed={palette.texture.seed}
				result="noise"
			/>
			<feColorMatrix in="noise" type="saturate" values="0" result="mono" />
			<feComponentTransfer in="mono" result="grain">
				<feFuncA type="table" tableValues={`0 ${palette.texture.alpha}`} />
			</feComponentTransfer>
			<feBlend in="SourceGraphic" in2="grain" mode="soft-light" />
		</filter>

		<filter id="{svgId}-soften" x="-5%" y="-5%" width="110%" height="110%">
			<feGaussianBlur stdDeviation={palette.soften} />
		</filter>
	</defs>

	<g clip-path={`url(#${svgId}-clip)`}>
		<rect width="512" height="512" fill={`url(#${svgId}-base)`} />
		{#each palette.radials as _, index}
			<rect width="512" height="512" fill={`url(#${svgId}-radial-${index})`} />
		{/each}
		<rect
			width="512"
			height="512"
			fill={palette.texture.fill}
			opacity={palette.texture.opacity}
			filter={`url(#${svgId}-texture)`}
		/>
	</g>

	<polygon
		points="256,20 456,136 456,376 256,492 56,376 56,136"
		fill="none"
		stroke="gray"
		stroke-opacity="1"
		stroke-width="16"
	/>
	<text
		x="256"
		y="256"
		fill="#eee"
		font-family="Noto Sans, Noto Sans CJK SC, sans-serif"
		font-size="220"
		font-weight="300"
		text-anchor="middle"
		dominant-baseline="central">{difficulty}</text
	>
</svg>
