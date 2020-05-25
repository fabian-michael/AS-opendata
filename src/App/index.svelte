<script>
    import {querystring} from 'svelte-spa-router';
    import Filter from '@Components/Filter';
    import Mapbox from '@Components/Mapbox';
    import logo from '@Assets/images/opendatalogo_small.png';

    let showDrawer = true;
    let loading = false;
    let filter;

    $: console.log(filter);
</script>

<style lang="scss">
    @use '../Assets/css/dev/breakpoints' as *;

    .wrapper {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
    }

    .drawer {
        transition: all 300ms;
        overflow: auto;

        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 999;
        transform: translateY(100%);

        &.open {
            transform: translateY(0);
        }

        @include md {
            position: static;
            max-width: 24em;
            transform: translateY(0) !important;
        }
    }

    .toggle {
        transform: translateY(-50%);
    }
</style>

<div class="layout container min-h-screen flex flex-col px-4">
    <main class="flex-auto flex my-4">
        <div class="wrapper w-full rounded-lg shadow-xl overflow-hidden flex">
            <div class="drawer w-full p-4 bg-gray-dark text-gray-lighter flex flex-col" class:open={showDrawer}>
                <div class="flex-auto">
                    <Filter disabled={loading} bind:filter/>
                </div>
                <span>© Fabian Michael</span>
            </div>
            <div class="mapbox flex-auto">
                <Mapbox />

            </div>
        </div>
    </main>
</div>
