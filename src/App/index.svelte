<style lang="scss">
    @use '../Assets/css/dev/breakpoints' as *;
    @use '../Assets/css/dev/variables' as *;

    .mapbox {
        padding-bottom: 2em;

        @include lg {
            padding-bottom: 0;
        }
    }

    .drawer {
        transition: all 300ms;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateY(100%);

        &.open {
            transform: translateY(0);
        }

        @include lg {
            position: static;
            max-width: 24em;
            transform: translateY(0) !important;
        }
    }

    .toggle {
        transform: translateY(-100%);
        height: 2em;
        touch-action: none;

        &:before,
        &:after {
            content: "";
            display: block;
            width: 1.5em;
            height: 0.25em;
            background: white;
            position: absolute;
            top: calc(50% - 0.216666666666667em);
            transition: transform 0.3s;
            border-radius: 9999px;
        }

        &:before {
            transform: rotate(-15deg);
            left: calc(50% - 0.65em);
        }

        &:after {
            transform: rotate(15deg);
            left: calc(50% + 0.65em);
        }

        .open &:before {
            transform: rotate(15deg);
        }

        .open &:after {
            transform: rotate(-15deg);
        }
    }

    .loading {
        background: rgba(0, 0, 0, 0.5);
    }
</style>

<script>
    import {fade} from 'svelte/transition';
    import {querystring} from "svelte-spa-router/Router.svelte";
    import Filter from "@Components/Filter";
    import Mapbox from "@Components/Mapbox";
    import Loader from "@Components/Loader";
    import Data from '@Stores/data.store';

    const BERLIN_LAT = 52.520008;
    const BERLIN_LON = 13.404954;

    let showDrawer = true;
    let loading = false;
    let filterTimeout;

    function handleFilter(e) {
        const {detail} = e;
         Data.makeRequest(detail);
    }

</script>

<main class="container flex-auto flex p-4">
    <div class="wrapper w-full shadow-xl overflow-hidden flex relative">
        <div class="drawer w-full p-4 bg-gray-dark text-gray-lighter flex flex-col z-10" class:open={showDrawer}>
            <button class="toggle absolute block w-full top-0 left-0 bg-gray-dark
					text-gray-light"
                    on:click={() => (showDrawer = !showDrawer)}
                    on:swipeup|stopPropagation|preventDefault={() => showDrawer = true}
                            on:swipedown|stopPropagation|preventDefault={() => showDrawer = false}></button>
            <div class="flex-auto">
                <Filter disabled={$Data.loading} on:filter={handleFilter}/>
            </div>
            <span>© Fabian Michael</span>
        </div>
        <div class="mapbox flex-auto z-0">
            <Mapbox center={[BERLIN_LON, BERLIN_LAT]} zoom={9} data={$Data.data}/>
        </div>
		{#if $Data.loading}
            <div class="loading absolute full top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50" transition:fade={{duration: 200}}>
                <Loader color="white"/>
            </div>
		{/if}
    </div>
</main>
