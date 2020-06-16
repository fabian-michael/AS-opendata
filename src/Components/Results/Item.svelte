<script>
	import { createEventDispatcher } from 'svelte';
    import {Button} from '@Components';
    import {ExternalLinkIcon, CheckIcon, XIcon, MapPinIcon} from 'svelte-feather-icons';
	export let data = {};
	export let coordinates = [];
	export let isListItem = false;
	const dispatch = createEventDispatcher();
</script>

<div>
    <p class="text-base"><strong>{data.name}</strong></p>
	<p class="text-gray-darker"><small>{data.art}</small></p>

    <p class="mt-2">
	    <strong>Angebot</strong><br />
	    {data.angebot}
    </p>

	<div class="flex mt-2">
	    <p class="flex-auto">
		    <strong>Abholen</strong><br />
		    {data.selbstabholung === 'WAHR' ? 'Ja' : 'Nein'}
		    <svelte:component this={data.selbstabholung === 'WAHR' ? CheckIcon : XIcon} size="1x" class="inline-block" />
	    </p>
	    <p class="flex-auto">
		    <strong>Lieferung</strong><br />
		    {data.lieferung === 'WAHR' ? 'Ja' : 'Nein'}
            <svelte:component this={data.lieferung === 'WAHR' ? CheckIcon : XIcon} size="1x" class="inline-block" />
	    </p>
	</div>

    <p class="mt-2">
	    <strong>Adresse</strong><br />
	    {data.strasse_nr}<br />
	    {data.plz} Berlin
    </p>

    <p class="mt-2">
	    <strong>Kontakt</strong><br />
		{#if data.fon || data.mail}
			{#if data.fon}
		        <a href="tel:{data.fon}" target="_blank">{data.fon}</a><br />
			{/if}
			{#if data.mail}
		        <a href="mailto:{data.mail}" target="_blank">{data.mail}</a><br />
			{/if}
		{:else}
			Keine Kontaktinformationen
		{/if}
	    </p>

	{#if data.w3 || isListItem}
        <div class="flex justify-end mt-4">
			{#if data.w3}
            	<Button href="{data.w3}" text="Webseite" icon={ExternalLinkIcon} target="_blank" />
			{/if}
			{#if isListItem}
            	<Button color="green" icon={MapPinIcon} class="ml-4" on:click={() => dispatch('btnFlyTo', coordinates)} />
			{/if}
        </div>
	{/if}
</div>
