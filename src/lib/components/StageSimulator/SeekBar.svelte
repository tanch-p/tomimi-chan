<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { GameConfig } from './objects/GameConfig';

	export let game, simulatedData;

	$: duration = (Object?.keys(simulatedData)?.length ?? 1) - 1;

	let seekbarElement, progressElement;
	let progress = 0;
	let tooltipPosition = 0;
	let tooltipTime = '00:00';
	let isHover = false;

	// Format time from seconds to MM:SS
	function formatTime(seconds) {
		seconds = Math.floor(seconds);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	// Update progress bar based on video's current time
	function updateProgress(time) {
		// Don't update progress during dragging - let the drag handler handle it
		updateValue(time);
	}

	// Calculate time from position
	function calculateTimeFromPosition(clientX) {
		if (!seekbarElement) return 0;

		const rect = seekbarElement.getBoundingClientRect();
		const position = clientX - rect.left;
		const percentage = position / rect.width;

		// Ensure percentage is between 0 and 1
		const clampedPercentage = Math.max(0, Math.min(1, percentage));
		return clampedPercentage * duration;
	}

	// Handle clicking on the seekbar
	function handleSeek(event) {
		if (!seekbarElement) return;
		const time = Math.floor(calculateTimeFromPosition(event.clientX));
		updateProgress(time);
	}

	// Handle mouse move for tooltip
	function handleMouseMove(event) {
		if (!seekbarElement) return;
		const rect = seekbarElement.getBoundingClientRect();
		const hoverPosition = event.clientX - rect.left;
		tooltipPosition = hoverPosition;
		const hoverTime = calculateTimeFromPosition(event.clientX);
		tooltipTime = formatTime(hoverTime);
	}

	function handleMouseEnter() {
		isHover = true;
	}
	function handleMouseLeave() {
		isHover = false;
	}

	let unsubscribe;
	onMount(() => {
		unsubscribe = GameConfig.subscribe('scaledElapsedTime', (value) => {
			progress = (value / duration) * 100;
		});
	});

	onDestroy(() => {
		unsubscribe && unsubscribe();
	});

	function updateValue(time) {
		GameConfig.setValue('isPaused', true);
		GameConfig.setValue('scaledElapsedTime', time);
		console.log(simulatedData[time]);
		if (game) {
			game.spawnManager.set(simulatedData[time]);
			game.gameManager.set(simulatedData[time]);
		}
		GameConfig.setValue('isPaused', false);
	}
</script>

<div
	class="absolute bottom-[10px] md:bottom-[20px] left-1/2 -translate-x-1/2 flex items-center justify-center w-full max-w-[90vw] md:max-w-[70vw]"
>
	<div
		class="relative w-full cursor-pointer select-none touch-none"
		bind:this={seekbarElement}
		on:click={handleSeek}
		on:mousemove={handleMouseMove}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
	>
		<div class="relative w-full bg-[#e6e6e6] rounded overflow-hidden h-[6px]">
			<div
				class="h-full bg-[#ff3e00] rounded relative"
				bind:this={progressElement}
				style="width: {progress}%;"
			/>
		</div>
		<div
			hidden={!isHover}
			class="absolute top-[-30px] z-[1] -translate-x-1/2 bg-[rgba(0,0,0,0.7)] rounded px-2 py-1 text-xs text-white"
			style="left: {tooltipPosition}px;"
		>
			{tooltipTime}
		</div>
	</div>
</div>
