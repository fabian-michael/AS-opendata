import {derived, readable, writable} from "svelte/store";
import { API } from '@Services';
import { FeatureCollection } from 'geojson';
import {Filter} from "@Types/filter";

function createStore() {
	// a store that holds a boolean to indicate that something is loading
	const loading = writable(false);

	// the store that holds the data from the API of type geojson FeatureCollection
	const data = writable({} as FeatureCollection);

	// combine the stores above in a derived store to encapsulate the data
	const {subscribe} = derived([loading, data], ([loading, data]) => ({
		loading,
		data
	}));

	return {
		subscribe,

		async makeRequest(filter: Filter) {
			try {
				loading.set(true);
				const response = await API.get('', filter);
				const gjson = await response.json() as FeatureCollection;
				data.set(gjson);
			} catch(e) {
				alert("Something went wrong");
			} finally {
				loading.set(false);
			}
		}
	}
}


export default createStore();