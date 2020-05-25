<script context="module">
    let closeCurrent;
</script>

<script>
    import uid from 'uid';
    import Label from '@Components/Label';
    import {onMount, onDestroy} from 'svelte';
    import {isOutOfViewport} from '@Utilities/viewport';

    export let items = [];
    export let name;
    export let id = uid();
    export let value;
    export let label = null;
    export let placeholder = 'Auswählen...';
    export let disabled = false;
    let isOpen = false;
    let listbox;
    let button;
    let selectedElement;
    $: value = selectedElement ? selectedElement.getAttribute('data-value') : undefined;
    //$: selectedElement ? selectedElement.focus() : null;

    function open() {
        if (closeCurrent && closeCurrent !== close) {
            closeCurrent();
        }
        closeCurrent = close;
        isOpen = true;
        listbox.focus();
        let isOut = isOutOfViewport(listbox);
        if(isOut.bottom) {
            listbox.classList.add('top');
        }
    }

    function close() {
        if (isOpen) {
            isOpen = false;
            closeCurrent = undefined;
        }
    }

    function toggle() {
        isOpen ? close() : open();
    }

    function handleKeydown(e) {
        switch (e.keyCode) {
            case 13: // Enter
                toggle();
                break;
            case 27: // Esc
                close();
                break;
            case 32: // Space
                if (!isOpen) open();
                break;
            case 38:
                if (!selectedElement)
                    selectedElement = listbox.firstChild;
                else if (selectedElement.previousSibling)
                    selectedElement = selectedElement.previousSibling;
                break;
            case 40: // Down Arrow
                // if(!isOpen) open();
                if (!selectedElement)
                    selectedElement = listbox.firstChild;
                else if (selectedElement.nextSibling)
                    selectedElement = selectedElement.nextSibling;

        }
    }

    function handleDocumentClick() {
        setTimeout(close, 50);
    }

    onMount(() => {
        document.addEventListener('click', handleDocumentClick);
    });

    onDestroy(() => {
        document.removeEventListener('click', handleDocumentClick);
    });
</script>

<style lang="scss">
    @use "../../Assets/css/dev/theme" as *;

    select {
        appearance: none;
    }

    @keyframes gradient {
        0%{background-position:0 0}
        100%{background-position:10000% 0}
    }

    .wrapper {
        &:after {
            content: "";
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 0px;
            height: 4px;
            border-bottom-left-radius: 2px;
            border-bottom-right-radius: 2px;
            background: repeating-linear-gradient(to right, $purple, $blue, $green, $yellow, $orange, $red, $purple) 0% 0%;
            background-size: 600% auto;
            animation: gradient 300s linear infinite;
            opacity: 0;
            transition: all 200ms;
        }

        &:focus-within {
            &:after {
                opacity: 1;
            }
        }
    }

    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
</style>



<div class="select relative">
    {#if label}
        <label class="block"
               class:disabled
               id="label_{id}"
               for="select_{id}"
        >
            <Label text="{label}" bold />
        </label>
    {/if}

    <div class="wrapper mt-2 mb-4 rounded shadow bg-gray-light text-gray-dark cursor-pointer overflow-hidden">
        <select class="block w-full  px-6 py-2"
                class:disabled
                id="select_{id}"
                bind:value
        >
            <option selected="selected">{placeholder}</option>
            {#each items as val, i}
                <option value={val}>
                    {val}
                </option>
            {/each}
        </select>
    </div>
</div>
