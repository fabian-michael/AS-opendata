<style lang="scss">
    @use "../../Assets/css/dev/theme" as *;

    @keyframes gradient {
        0%{background-position:0 0}
        100%{background-position:10000% 0}
    }

    .input {
        position: relative;
        background: $gray-light;
        transition: all 300ms;
        &:after {
            content: "";
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 0px;
            z-index: 1;
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
            background-color: white;

            &:after {
                opacity: 1;
            }
        }
    }

    input {
        background: transparent;

        &::placeholder {
            color: $gray;
        }

        &:focus {
            outline: none;
        }
    }
</style>

<script>
    import uid from 'uid';
    import Label from '@Components/Label';

    const types = [
        'text',
        'email',
        'tel',
        'password',
        'date',
        'textarea'
    ];

    export let type = 'text';
    export let name = null;
    export let id = uid();
    export let label = null;
    export let placeholder = null;
    export let required = false;
    export let value = null;

    const klass = 'block w-full px-6 py-2';

    $: !types.includes(type) ? type = 'text' : null;
</script>

<div>
    {#if label}
        <label class="block" for={id}>
            <Label text="{label}" bold />
        </label>
    {/if}
    <div class="input rounded shadow mt-2 mb-4 overflow-hidden">
        {#if type === 'text'}
            <input class={klass} type="text" {name} {id} {required} {placeholder} bind:value />
        {:else if type === 'email'}
            <input class={klass} type="email" {name} {id} {required} {placeholder} bind:value />
        {:else if type === 'password'}
            <input class={klass} type="password" {name} {id} {required} {placeholder} bind:value />
        {:else if type === 'date'}
            <input class={klass} type="date" {name} {id} {required} {placeholder} bind:value />
        {:else if type === 'textarea'}
            <textarea class={klass} {name} {id} {required} {placeholder} bind:value />
        {/if}
    </div>
</div>
