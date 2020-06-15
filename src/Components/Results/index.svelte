<script>
	import Data from '@Stores/data.store';
    import {ExternalLinkIcon} from 'svelte-feather-icons';
    import Button from '@Components/Button';
</script>

<ul class="results">
	{#if $Data.data.features}
		{#each $Data.data.features as element}
			<li class="rounded-lg bg-white shadow p-4 text-gray-dark">
                <p class="text-base"><strong>{element.properties.data.name}</strong></p>
                <p class="mb-2">{element.properties.data.angebot}</p>
                <p>Selbstabholen: {element.properties.data.selbstabholung === 'WAHR' ? 'Ja' : 'Nein'}</p>
                <p>Lieferung: {element.properties.data.lieferung === 'WAHR' ? 'Ja' : 'Nein'}</p>
                <p class="mt-2">{element.properties.data.strasse_nr}</p>
                <p class="mb-2">{element.properties.data.plz} Berlin</p>
				{#if element.properties.data.fon}
                    <div><a href="tel:{element.properties.data.fon}" target="_blank">{element.properties.data.fon}</a></div>
				{/if}
				{#if element.properties.data.mail}
                    <div><a href="mailto:{element.properties.data.mail}" target="_blank">{element.properties.data.mail}</a></div>
				{/if}
                <div class="mt-2 flex justify-end">
	                <Button text="Mehr" icon={ExternalLinkIcon} target="_blank" />
                </div>
			</li>
		{/each}
	{/if}
</ul>

<style lang="scss">
    @use '../../Assets/css/dev/breakpoints' as *;

	.results {
		display: grid;
		grid-gap: 2rem;

        @include lg {
        }
	}
</style>