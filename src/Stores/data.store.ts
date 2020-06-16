import { derived, writable } from 'svelte/store';
import { API } from '@Services';
import { FeatureCollection } from 'geojson';
import { Filter } from '@Types/filter';

interface State {
	initial: boolean;
	loading: boolean;
	success: boolean;
	error: boolean;
}

function createStore() {
	// a store that holds a boolean to indicate that something is loading
	const state = writable({
		initial: true,
		loading: false,
		success: false,
		error: false,
	} as State);

	// the store that holds the data from the API of type geojson FeatureCollection
	const data = writable({} as FeatureCollection);

	// combine the stores above in a derived store to encapsulate the data
	const { subscribe } = derived([state, data], ([state, data]) => ({
		state,
		data,
		count: data.features?.length || 0,
	}));

	const updateState = ({
		initial = false,
		loading = false,
		success = false,
		error = false,
	}) => state.set({ initial, loading, success, error });

	return {
		subscribe,

		async makeRequest(filter: Filter) {
			try {
				updateState({ loading: true });
				const response = await API.get('', filter);
				const gjson = (await response.json()) as FeatureCollection;
				data.set(gjson);
				updateState({ success: true });
			} catch (e) {
				alert('Something went wrong');
				updateState({ error: true });
			}
		},
	};
}

export default createStore();
