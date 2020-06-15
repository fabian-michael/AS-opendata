<script>
	export let text = '';
	export let icon = null;
	export let color = null;
	export let href = null;
	export let target = null;
	let customClass = '';
	export {customClass as class};

	const colors = {
		blue: 'blue',
		// ...
	}
</script>

{#if typeof href === 'string'}

    <a {href} on:click class="inline-block p-4 rounded text-white no-underline bg-{colors[color] || 'blue'} {customClass}" {target}>
		{text}
		{#if icon}
            <svelte:component this={icon} size="1x" />
		{/if}
    </a>

{:else}

    <button on:click class="p-4 rounded text-white bg-{colors[color] || 'blue'} {customClass}">
		{text}
		{#if icon}
            <svelte:component this={icon} size="1x" />
		{/if}
    </button>

{/if}