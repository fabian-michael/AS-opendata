<style lang="scss">
    .spin {
        animation: spin 2s infinite linear;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>

<script>
    export let d;
    export let size = 1;
    export let spin = false;

    $: sizeStr = typeof size === 'number' ? (size*1.25) + 'em' : size;
</script>

<svg class="fill-current inline-block" class:spin width={sizeStr} height={sizeStr} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path {d} />
</svg>