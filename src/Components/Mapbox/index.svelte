<script>
    import {onMount, getContext} from "svelte";
    import mapboxgl from "mapbox-gl/dist/mapbox-gl";
    import Item from '@Components/Results/Item.svelte';

    export let center = [];
    export let zoom = 1;
    export let data = {};

    let container;
    let map;
	let ready = false;
	let resultsContainer; 
	$: console.log(resultsContainer);
	

    // automatically update map if data changes
    $: if (ready && data) {
            map.getSource('data').setData(data);
    }

    function initMap() {
        ready = map && map.isStyleLoaded();
        if(!ready) {
            setTimeout(initMap, 200);
        } else {
            // attach data to map with key "data"
            map.addSource("data", {
                type: "geojson",
                data,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });

            // add a layer for the cluster circles
            map.addLayer({
                id: "data",
                type: "circle",
                source: "data",
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#75CFF0',
                        100,
                        '#75CFF0',
                        750,
                        '#75CFF0'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                },
            });

            // add a layer for the cluster count
            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'data',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-size': 12
                },
                paint: {
                    'text-color': '#ffffff',
                },
            });

            // add a layer for the unclustered points
            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'data',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 10,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                },
            });
        }
    }
    initMap();

    onMount(() => {
		resultsContainer = getContext('resultsContainer').get();
		
        mapboxgl.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;
        map = new mapboxgl.Map({
            container,
            style: "mapbox://styles/mapbox/streets-v11",
            center,
            zoom,
        });

        // user localisation
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );

        map.on('mouseenter', 'data', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'data', function () {
            map.getCanvas().style.cursor = '';
        });

        map.on('click', 'data', function (e) {
            let coordinates = e.features[0].geometry.coordinates.slice();
            let properties = e.features[0].properties;

            // return if clicked on a cluster
            if (properties.cluster === true) return false;

            let data = JSON.parse(properties.data);

            // render popup component
            const placeholder = document.createElement('div');
            placeholder.classList.add('pt-4');
            new Item({
                target: placeholder,
                props: {
                    data
                }
            });

            // create the popup
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setDOMContent(placeholder)
				.addTo(map);
				
			// scroll resultsContainer to clicked element
			let anchor = resultsContainer.querySelector(`#result_${data.unique_id}`);
			let rectResultsContainer = resultsContainer.getBoundingClientRect();
			let rectAnchor = anchor.getBoundingClientRect();
			resultsContainer.scrollTop = resultsContainer.scrollTop + (rectAnchor.top - rectResultsContainer.top);
        });
    });
</script>

<style lang="scss">
    @import "~mapbox-gl/dist/mapbox-gl.css";
</style>

<div class="mapbox full" bind:this={container}>
	{#if map}
        <slot/>
	{/if}
</div>
