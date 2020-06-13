<script>
    import {onMount} from "svelte";
    import mapboxgl from "mapbox-gl/dist/mapbox-gl";

    export let center = [];
    export let zoom = 1;
    export let data = undefined;

    let container;
    let map;

    $: if (map && map.isStyleLoaded() && data) {
        if (map.getSource('data')) {
            map.getSource('data').setData(data);
        } else {
            map.addSource("data", {
                type: "geojson",
                data,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });

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

    onMount(() => {
        mapboxgl.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;
        map = new mapboxgl.Map({
            container,
            style: "mapbox://styles/mapbox/streets-v11",
            center,
            zoom,
        });

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
            if (properties.cluster === true) return false;

            let data = JSON.parse(properties.data);

            console.log(data);

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

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
						${data.fon ? '<div><a href="mailto:' + data.mail + '">' + data.mail + '</a></div>' : ''}
						<div><a href="${data.w3}" target="_blank">Mehr...</a></div>
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
