<script>
    import {onMount} from 'svelte';
    import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
    let container;
    let map;

    export let dataSource;

    onMount(() => {
        mapboxgl.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;
        map = new mapboxgl.Map({
            container,
            style: 'mapbox://styles/mapbox/streets-v11'
        });
    });
</script>

<style lang="scss">
    @import "~mapbox-gl/dist/mapbox-gl.css";
</style>

<div class="mapbox full" bind:this={container}>
    {#if map}
        <slot></slot>
    {/if}
</div>
