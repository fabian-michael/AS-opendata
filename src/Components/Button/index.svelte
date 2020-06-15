<script>
	export let text = '';
	export let icon = null;
	export let color = null;
	export let href = null;
	export let target = null;
	export let small = false;
	export let rounded = true;
	let customClass = '';
	export {customClass as class};

	const colors = {
		blue: 'blue',
		// ...
	}
</script>

{#if typeof href === 'string'}

    <a {href} on:click class="inline-block text-white no-underline leading-none bg-{colors[color] || 'blue'} {customClass}"
       class:p-4={!small}
       class:p-2={small}
       class:rounded
       {target}>
		{text}
		{#if icon}
            <svelte:component this={icon} size="1x" />
		{/if}
    </a>

{:else}

    <button on:click class="text-white leading-none bg-{colors[color] || 'blue'} {customClass}"
            class:p-4={!small}
            class:p-2={small}
            class:rounded>
		{text}
		{#if icon}
            <svelte:component this={icon} size="1x" />
		{/if}
    </button>

{/if}