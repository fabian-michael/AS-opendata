<script>
    import uid from 'uid';

    export let items = [];
    export let name = null;
    export let id = uid();
    export let value = null;
    export let label = null;
    export let placeholder = 'Auswählen...';
    export let disabled = false;
</script>

<style lang="scss">
    @use "../../Assets/css/dev/variables" as *;

    select {
        appearance: none;
        text-align: center;
        text-align-last: center;
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



<div class="relative select" class:disabled>
    {#if label}
        <label class="block font-bold"
               id="label_{id}"
               for="select_{id}"
        >
            {label}
        </label>
    {/if}

    <div class="relative mt-2 mb-4 overflow-hidden rounded shadow cursor-pointer wrapper bg-gray-light text-gray-dark">
        <select class="block w-full p-2"
                id="select_{id}"
                {name}
                bind:value
        >
            <option selected="selected" value={null}>{placeholder}</option>
            {#each items as val, i}
                <option value={val}>
                    {val}
                </option>
            {/each}
        </select>
        
    </div>
</div>
