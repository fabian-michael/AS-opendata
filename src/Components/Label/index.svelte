<style lang="scss">
    span {
        :global(svg) {
            margin-top: -0.2em;
        }

        :global(* + *) {
            /*@apply ml-1;*/
        }
    }
</style>

<script>
    import Icon from '@Components/Icon';
    export let text;
    export let iconBefore = null;
    export let iconBeforeSpin = false;
    export let iconAfter = null;
    export let iconAfterSpin = false;
    export let bold = false;
    export let block = false;
    export let hideTextOnMobile = false;
    export let color;

    let colorClass;

    const colors = [
        'black',
        'white',
        'red-light',
        'red-lighter',
        'red',
        'red-darker',
        'red-dark',
        'blue-light',
        'blue-lighter',
        'blue',
        'blue-darker',
        'blue-dark',
        'orange-light',
        'orange-lighter',
        'orange',
        'orange-darker',
        'orange-dark',
        'green-light',
        'green-lighter',
        'green',
        'green-darker',
        'green-dark'
    ];


    $: !colors.includes(color) ? color = 'inherit' : null;
    $: colorClass = color === 'inherit' ? '' : 'text-' + color;
</script>

<span class="label {colorClass}" class:font-bold={bold} class:block>
    {#if iconBefore}
        <Icon d={iconBefore} spin={iconBeforeSpin} />
    {/if}
    {#if text}
        <span class:sr-only={hideTextOnMobile} class:md:not-sr-only={hideTextOnMobile}>{text}</span>
    {/if}
    {#if iconAfter}
        <Icon d={iconAfter} spin={iconAfterSpin} />
    {/if}
</span>