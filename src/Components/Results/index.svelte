<script>
	import Data from '@Stores/data.store';
    import Item from './Item';
</script>

<ul class="results flex flex-col">
	{#if $Data.data.features}
		{#each $Data.data.features as element}
            <li class="rounded bg-white shadow p-4 my-4 text-gray-dark">
				<Item data={element.properties.data}/>
            </li>
		{/each}
	{/if}
</ul>
