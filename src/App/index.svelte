<style lang="scss">
    @use '../Assets/css/dev/breakpoints' as *;
    @use '../Assets/css/dev/variables' as *;

    .mapbox {
        padding-bottom: 2em;

        @include lg {
            padding-bottom: 0;
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
    import {onMount, onDestroy, setContext} from 'svelte';
    import Filter from "@Components/Filter/index.svelte";
    import Mapbox from "@Components/Mapbox/index.svelte";
    import Loader from "@Components/Loader/index.svelte";
    import Results from "@Components/Results/index.svelte";
    import Button from "@Components/Button/index.svelte";
    import Drawer from "@Components/Drawer/index.svelte";
    import Data from '@Stores/data.store';
    import {objectToURLParams, URLParamsToObject} from "@Utilities";
    import {ArrowLeftIcon, ArrowRightIcon, FilterIcon, Maximize2Icon, Minimize2Icon, XIcon} from 'svelte-feather-icons';


    // coordinates of berlin to initialize map
    const BERLIN_LAT = 52.520008;
    const BERLIN_LON = 13.404954;

    let showDrawer = true;
    let fullSizeDrawer = false;
    let swiper;
    let filter = applyURLParamsToFilter();
	let doPushState = false;
	let resultsContainer;
	setContext('resultsContainer', {
		get: () => resultsContainer
	});
	
	$: isLoading = $Data.state.loading;

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

<main class="fixed flex overflow-hidden full">
    <Drawer bind:show={showDrawer} bind:fullSize={fullSizeDrawer}>
        <div class="flex h-full swiper" bind:this={swiper}
             on:swipeleft|stopPropagation|preventDefault={() => swiper.style.transform = 'translateX(-50%)'}
             on:swiperight|stopPropagation|preventDefault={() => swiper.style.transform = 'translateX(0)'} >

            <div class="p-4">
                <Filter disabled={isLoading} on:filter={handleFilter} bind:filter/>

                <div class="flex justify-end py-4">
                    <Button text="{$Data.count} Ergebnisse"
                            icon={ArrowRightIcon}
                            on:click={() => swiper.style.transform = 'translateX(-50%)'}/>
                </div>

                <span>© Fabian Michael</span>
            </div>

            <div class="flex flex-col h-full">

                <div class="flex justify-between flex-shrink-0 p-4">
                    <Button icon={ArrowLeftIcon}
                            on:click={() => swiper.style.transform = 'translateX(0)'} small/>
                    <Button class="toggle-full-size" icon={fullSizeDrawer ? Minimize2Icon : Maximize2Icon}
                            on:click={() => fullSizeDrawer = !fullSizeDrawer} small/>
                </div>

                <div class="flex-auto w-full px-8 py-4 overflow-x-hidden overflow-y-auto bg-gray-light" bind:this={resultsContainer}>
					<ul class="flex flex-wrap -mx-2">
						{#if filter.q}
							<li class="p-2 m-2 leading-none text-white truncate rounded bg-green max-w-38">
								<button class="p-0 m-0" on:click={() => filter.q = ''}><XIcon size="1x" /></button> {filter.q}
							</li>
						{/if}
						{#if filter.plz}
							<li class="p-2 m-2 leading-none text-white truncate rounded bg-green max-w-38">
								<button class="p-0 m-0" on:click={() => filter.plz = null}><XIcon size="1x" /></button> {filter.plz}
							</li>
						{/if}
						{#if filter.art}
							<li class="p-2 m-2 leading-none text-white truncate rounded bg-green max-w-38">
								<button class="p-0 m-0" on:click={() => filter.art = null}><XIcon size="1x" /></button> {filter.art}
							</li>
						{/if}
					</ul>

                    <Results/>
                </div>

            </div>
            
        </div>
    </Drawer>

    <div class="z-0 flex-auto mapbox">
        <Mapbox center={[BERLIN_LON, BERLIN_LAT]} zoom={9} data={$Data.data}/>
    </div>

	{#if isLoading}
        <div class="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center loading full"
             transition:fade={{duration: 200}}>
            <Loader color="white"/>
        </div>
	{/if}
</main>
