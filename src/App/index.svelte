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
        touch-action: none;
        max-height: 26rem;

        &.open {
            transform: translateY(0);
        }

        &.full-size {
            max-height: 100%;
            height: 100%
        }

        @include lg {
            position: static;
            max-width: 24em;
            transform: translateY(0) !important;
            max-height: none;
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

    .swiper {
        width: 200%;
        transition: transform 300ms;
        > * {
            width: 50%;
        }
    }

    :global(.toggle-full-size) {
        @include lg {
            display: none !important;
        }
    }
</style>

<script>
    import {fade} from 'svelte/transition';
    import {onMount, onDestroy} from 'svelte';
    import Filter from "@Components/Filter";
    import Mapbox from "@Components/Mapbox";
    import Loader from "@Components/Loader";
    import Results from "@Components/Results";
    import Button from "@Components/Button";
    import Data from '@Stores/data.store';
    import {objectToURLParams, URLParamsToObject} from "@Utilities";
    import {ArrowLeftIcon, ArrowRightIcon, FilterIcon, Maximize2Icon, Minimize2Icon} from 'svelte-feather-icons';


    // coordinates of berlin to initialize map
    const BERLIN_LAT = 52.520008;
    const BERLIN_LON = 13.404954;

    let swiper;
    let showDrawer = true;
    let fullSize = false;
    let filter = applyURLParamsToFilter();
    let doPushState = false;

    // merge default filter with URL params
    function applyURLParamsToFilter() {
        return {
            q: '',
            plz: null,
            art: null,
            ...URLParamsToObject(new URLSearchParams(window.location.search))
        };
    }

    // handle filter change emitted from Filter component
    function handleFilter(event) {
        // event.detail hold the filter object
        const {detail} = event;
        Data.makeRequest(detail);

        // do push state (only) on manual change
        if (doPushState) history.pushState('', '', '?' + objectToURLParams(detail));
        doPushState = true;
    }

    // handle back and forward history events
    function handlePopstate(event) {
        filter = applyURLParamsToFilter();
        doPushState = false;
    }

    function handleSwipeUp() {
        if(showDrawer) {
            fullSize = true
        }
        showDrawer = true
    }

    function handleSwipeDown() {
        if(fullSize) {
            fullSize = false
        } else {
            showDrawer = false
        }
    }

    // mobile height fix see global.css
    function updateAppHeight() {
        // get the viewport height and multiple it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    onMount(() => {
        window.addEventListener('popstate', handlePopstate);
        window.addEventListener('resize', updateAppHeight);
        updateAppHeight();
    })

    onDestroy(() => {
        window.removeEventListener('popstate', handlePopstate);
        window.removeEventListener('resize', updateAppHeight);
    })
</script>

<main class="full overflow-hidden flex relative">
    <div class="drawer full bg-gray-dark text-gray-lighter flex flex-col z-10" class:open={showDrawer} class:full-size={fullSize}
         on:swipeup|stopPropagation|preventDefault={handleSwipeUp}
         on:swipedown|stopPropagation|preventDefault={handleSwipeDown} >

        <button class="toggle absolute block w-full top-0 left-0 bg-gray-dark text-gray-light"
                on:click={() => (showDrawer = !showDrawer)} />

        <div class="flex-auto h-full overflow-hidden">
            <div class="swiper flex h-full" bind:this={swiper}
                 on:swipeleft|stopPropagation|preventDefault={() => swiper.style.transform = 'translateX(-50%)'}
                 on:swiperight|stopPropagation|preventDefault={() => swiper.style.transform = 'translateX(0)'} >
                <div class="p-4 ">
                    <Filter disabled={$Data.loading} on:filter={handleFilter} bind:filter/>

                    <div class="flex justify-end py-4">
                        <Button text="{$Data.data.features ? $Data.data.features.length : 0} Ergebnisse" icon={ArrowRightIcon}
                                on:click={() => swiper.style.transform = 'translateX(-50%)'} />
                    </div>

                    <span>© Fabian Michael</span>
                </div>
                <div class="flex flex-col h-full">
                    <div class="p-4 flex justify-between flex-shrink-0">
                        <Button icon={ArrowLeftIcon}
                                on:click={() => swiper.style.transform = 'translateX(0)'} />
                        <Button class="toggle-full-size" icon={fullSize ? Minimize2Icon : Maximize2Icon}
                                on:click={() => fullSize = !fullSize} />
                    </div>
                    <div class="flex-auto w-full overflow-x-hidden overflow-y-auto px-8 bg-gray-light">
                        <Results />
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="mapbox flex-auto z-0">
        <Mapbox center={[BERLIN_LON, BERLIN_LAT]} zoom={9} data={$Data.data}/>
    </div>

    {#if $Data.loading}
        <div class="loading absolute full top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50"
             transition:fade={{duration: 200}}>
            <Loader color="white"/>
        </div>
    {/if}
</main>
