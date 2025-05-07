<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { GameConfig } from './objects/GameConfig';

	export let game, simulatedData;

	export let videoElement = null; // Reference to the video element
	export let height = '6px'; // Height of the seekbar
	export let color = '#ff3e00'; // Primary color for the progress
	export let backgroundColor = '#e6e6e6'; // Background color for the seekbar
	export let showTooltip = true; // Whether to show time tooltip on hover
	export let tooltipFormat = (seconds) => formatTime(seconds); // Format function for tooltip

	let value = 0;

	let seekbarElement, progressElement;
	let tooltipElement;
	let isDragging = false;
	let seekbarWidth = 0;
	let seekbarLeft = 0;
	let progress = 0;
	let tooltipPosition = 0;
	let tooltipTime = '00:00';
	let tooltipVisible = false;
	let updateInterval;
	let wasPlaying = false; // Track if video was playing before drag

	// Format time from seconds to MM:SS
	function formatTime(seconds) {
		seconds = Math.floor(seconds);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	// Update progress bar based on video's current time
	function updateProgress() {
		if (!videoElement) return;

		const { currentTime, duration } = videoElement;
		// Don't update progress during dragging - let the drag handler handle it
		if (!isDragging) {
			progress = (currentTime / duration) * 100 || 0;
		}
	}

	// Calculate time from position
	function calculateTimeFromPosition(clientX) {
		if (!seekbarElement || !videoElement) return 0;

		const rect = seekbarElement.getBoundingClientRect();
		const position = clientX - rect.left;
		const percentage = position / rect.width;

		// Ensure percentage is between 0 and 1
		const clampedPercentage = Math.max(0, Math.min(1, percentage));

		return clampedPercentage * videoElement.duration;
	}

	// Handle clicking on the seekbar
	function handleSeek(event) {
		if (!videoElement || !seekbarElement) return;

		// Update video time
		videoElement.currentTime = calculateTimeFromPosition(event.clientX);

		// Update progress immediately for responsive UI
		updateProgress();
	}

	// Handle mouse move for tooltip
	function handleMouseMove(event) {
		if (!seekbarElement || !videoElement) return;

		const rect = seekbarElement.getBoundingClientRect();
		const hoverPosition = event.clientX - rect.left;

		// Calculate tooltip position and time
		tooltipPosition = hoverPosition;

		// If dragging, update video position
		if (isDragging) {
			const newTime = calculateTimeFromPosition(event.clientX);
			videoElement.currentTime = newTime;
			tooltipTime = tooltipFormat(newTime);
		} else {
			// Just update tooltip
			const hoverTime = calculateTimeFromPosition(event.clientX);
			tooltipTime = tooltipFormat(hoverTime);
		}

		// Show tooltip
		tooltipVisible = true;
	}

	// Start dragging
	function handleMouseDown(event) {
		if (!videoElement) return;

		// Remember if video was playing
		wasPlaying = !videoElement.paused;

		// Pause while dragging for better performance
		if (wasPlaying) {
			videoElement.pause();
		}

		// Set dragging state
		isDragging = true;

		// Update position immediately
		handleMouseMove(event);

		// Add global event listeners for drag tracking
		window.addEventListener('mousemove', handleGlobalMouseMove);
		window.addEventListener('mouseup', handleGlobalMouseUp);
	}

	// Track mouse movement globally when dragging
	function handleGlobalMouseMove(event) {
		if (isDragging) {
			handleMouseMove(event);
		}
	}

	// End dragging
	function handleGlobalMouseUp() {
		if (isDragging) {
			isDragging = false;

			// Resume playback if it was playing before
			if (wasPlaying) {
				videoElement.play();
			}

			// Remove global event listeners
			window.removeEventListener('mousemove', handleGlobalMouseMove);
			window.removeEventListener('mouseup', handleGlobalMouseUp);
		}
	}

	// Hide tooltip when mouse leaves seekbar (only if not dragging)
	function handleMouseLeave() {
		if (!isDragging) {
			tooltipVisible = false;
		}
	}

	onMount(() => {
		// Get initial dimensions of seekbar
		if (seekbarElement) {
			const rect = seekbarElement.getBoundingClientRect();
			seekbarWidth = rect.width;
			seekbarLeft = rect.left;
		}

		// Set up interval to update progress regularly
		updateInterval = setInterval(updateProgress, 250);

		// Add event listener for video loadedmetadata
		if (videoElement) {
			videoElement.addEventListener('loadedmetadata', updateProgress);
			videoElement.addEventListener('timeupdate', updateProgress);
		}
	});

	onDestroy(() => {
		// Clean up interval and event listeners
		clearInterval(updateInterval);

		if (videoElement) {
			videoElement.removeEventListener('timeupdate', updateProgress);
		}

		// Clean up global event listeners if component is destroyed while dragging
		window.removeEventListener('mousemove', handleGlobalMouseMove);
		window.removeEventListener('mouseup', handleGlobalMouseUp);
	});

	// Watch for changes to the video element prop
	$: if (videoElement) {
		videoElement.addEventListener('loadedmetadata', updateProgress);
		videoElement.addEventListener('timeupdate', updateProgress);
		updateProgress();
	}

	function updateValue(v) {
		const time = parseInt(v.target.value);
		GameConfig.setValue('scaledElapsedTime', time);
		console.log(simulatedData[time]);
		if (game) {
			game.spawnManager.set(simulatedData[time]);
			// game.gameManager.set(simulatedData[time]);
		}
	}
</script>

<div
	class="absolute bottom-[10px] md:bottom-[20px] left-1/2 -translate-x-1/2 flex items-center justify-center w-full max-w-[90vw] md:max-w-[70vw] gap-x-2.5"
>
	<input
		bind:value
		type="range"
		min={0}
		max={Object.keys(simulatedData).length - 1}
		step="1"
		on:input={updateValue}
		class="w-full cursor-pointer"
	/>
</div>
