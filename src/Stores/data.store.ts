import {derived, readable, writable} from "svelte/store";
import { API } from '@Services';
import { FeatureCollection } from 'geojson';
import {Filter} from "@Types/filter";

function createStore() {
	const loading = writable(false);
	const data = writable({} as FeatureCollection);
	const {subscribe} = derived([loading, data], ([loading, data]) => ({
		loading,
		data
	}));

	return {
		subscribe,

		async makeRequest(filter: Filter) {
			try {
				loading.set(true);
				const response = await API.get('', filter) as FeatureCollection;
				data.set(response);
			} catch(e) {
				alert("Something went wrong");
			} finally {
				loading.set(false);
			}
		}
	}
}


export default createStore();