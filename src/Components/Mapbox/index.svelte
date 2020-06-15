<script>
    import {onMount} from "svelte";
    import mapboxgl from "mapbox-gl/dist/mapbox-gl";

    export let center = [];
    export let zoom = 1;
    export let data = undefined;

    let container;
    let map;
    let ready = false;

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

            // create the popup
            new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`
					<div class="p-4">
						<p class="text-base"><strong>${data.name}</strong></p>
						<p class="mb-2">${data.angebot}</p>
						<p>Selbstabholen: ${data.selbstabholung === 'WAHR' ? 'Ja' : 'Nein'}</p>
						<p>Lieferung: ${data.lieferung === 'WAHR' ? 'Ja' : 'Nein'}</p>
						<p class="mt-2">${data.strasse_nr}</p>
						<p class="mb-2">${data.plz} Berlin</p>
						${data.fon ? '<div><a href="tel:' + data.fon + '" target="_blank">' + data.fon + '</a></div>' : ''}
						${data.mail ? '<div><a href="mailto:' + data.mail + '">' + data.mail + '</a></div>' : ''}
						<div class="mt-2 flex justify-end">
                            <a class="inline-block px-4 py-2 rounded bg-blue text-white no-underline" href="${data.w3}" target="_blank">Mehr...</a>
                        </div>
					</div>
				`)
                    .addTo(map);
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
