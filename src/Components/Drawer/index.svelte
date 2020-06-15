<script>
    export let show = true;
    export let fullSize = false;

    function handleSwipeUp() {
        if (show) {
            fullSize = true
        }
        show = true
    }

    function handleSwipeDown() {
        if (fullSize) {
            fullSize = false
        } else {
            show = false
        }
    }
</script>

<div class="z-10 flex flex-col drawer full bg-gray-dark text-gray-lighter" class:open={show}
     class:full-size={fullSize}
     on:swipeup|stopPropagation|preventDefault={handleSwipeUp}
     on:swipedown|stopPropagation|preventDefault={handleSwipeDown}>

    <button class="absolute top-0 left-0 block w-full toggle bg-gray-dark text-gray-light"
            on:click={() => (show = !show)}></button>

	<div class="flex-auto h-full overflow-hidden">
		<slot />
	</div>
</div>

<style lang="scss">
    @use '../../Assets/css/dev/breakpoints' as *;
    @use '../../Assets/css/dev/variables' as *;

    .drawer {
        transition: all 300ms;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateY(100%);
        touch-action: none;
        max-height: 26rem;

        &.open {
            transform: translateY(0);
        }

        &.full-size {
            max-height: 100%;
            height: 100%
        }

        @include lg {
            position: static;
            max-width: 28em;
            transform: translateY(0) !important;
            max-height: none;
        }
    }

    .toggle {
        transform: translateY(-100%);
        height: 2em;
        touch-action: none;

        &:before,
        &:after {
            content: "";
            display: block;
            width: 1.5em;
            height: 0.25em;
            background: white;
            position: absolute;
            top: calc(50% - 0.216666666666667em);
            transition: transform 0.3s;
            border-radius: 9999px;
        }

        &:before {
            transform: rotate(-15deg);
            left: calc(50% - 0.65em);
        }

        &:after {
            transform: rotate(15deg);
            left: calc(50% + 0.65em);
        }

        .open &:before {
            transform: rotate(15deg);
        }

        .open &:after {
            transform: rotate(-15deg);
        }
    }
</style>