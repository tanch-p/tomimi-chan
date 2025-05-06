<script lang="ts">
    let value = 0

    function updateValue(v){
        value = parseInt(v.target.value);
    }
</script>

<div class="absolute bottom-[10px] md:bottom-[20px] left-1/2 -translate-x-1/2 flex items-center justify-center w-full max-w-[90vw] md:max-w-[70vw] gap-x-2.5">
	<input
		bind:value={value}
		type="range"
		min={0}
		max={100}
		step="1"
		on:input={updateValue}
		class="w-full cursor-pointer"
	/>
</div>