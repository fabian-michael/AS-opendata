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

class DataStore {
	// a store that holds a boolean to indicate that something is loading
	private state = writable({
		initial: true,
		loading: false,
		success: false,
		error: false,
	} as State);

	// the store that holds the data from the API of type geojson FeatureCollection
	private data = writable({} as FeatureCollection);

	// combine the stores above in a derived store to encapsulate the data
	private _derived = derived([this.state, this.data], ([state, data]) => ({
		state,
		data,
		count: data.features?.length || 0,
	}));

	private updateState = ({
		initial = false,
		loading = false,
		success = false,
		error = false,
	}) => this.state.set({ initial, loading, success, error });

	public subscribe = this._derived.subscribe;

	public async makeRequest(filter: Filter) {
		try {
			this.updateState({ loading: true });
			const response = await API.get('', filter);
			const gjson = (await response.json()) as FeatureCollection;
			this.data.set(gjson);
			this.updateState({ success: true });
		} catch (e) {
			alert('Something went wrong');
			this.updateState({ error: true });
		}
	}
}

export default new DataStore();
