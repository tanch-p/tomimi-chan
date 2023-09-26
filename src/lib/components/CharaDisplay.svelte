<script lang="ts">
    export let characters;
</script>

    <div class="grid grid-cols-4 md:grid-cols-8 max-w-4xl mx-auto">
        {#each characters as chara}
            <div>
                {chara.appellation}
            </div>
        {/each}
    </div>

