<script>
	import Data from '@Stores/data.store';
	import Loader from '@Components/Loader/index.svelte';
	import Item from './Item';
	import {FrownIcon} from 'svelte-feather-icons';
	
	$: isLoading = $Data.state.loading;
	$: isSuccess = $Data.state.success;
	$: isError = $Data.state.error;
	$: console.log($Data.data.features);
	
</script>

<ul class="flex flex-col text-center results text-gray-darker">
	{#if isSuccess}
		<li>
			{$Data.count} Ergebnisse
		</li>
		{#each $Data.data.features as element}
            <li id="result_{element.properties.data.unique_id}" class="p-4 my-4 text-left bg-white rounded shadow text-gray-dark">
				<Item data={element.properties.data}/>
            </li>
		{:else}
			<li>
				Keine Ergebnisse
			</li>
		{/each}
	{:else if isLoading}
		<li>
			Lädt...
		</li>
	{:else if isError}
		<li class="text-red">
			<FrownIcon size="1x" /><br />
			Ein Fehler ist aufgetreten
		</li>
	{/if}
</ul>
