<style lang="scss">
    @use "../../Assets/css/dev/variables" as *;

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

	.disabled {
        pointer-events: none;
        opacity: 0.5;
    }
</style>

<script>
    import uid from 'uid';
    import Label from '@Components/Label';

    const types = [
        'text',
        'search',
        'email',
        'tel',
        'password',
        'date',
        'textarea'
    ];

    export let type = 'text';
    export let name = undefined;
    export let id = uid();
    export let label = undefined;
    export let placeholder = undefined;
	export let required = false;
	export let disabled = false;
    export let value = '';

    const klass = 'block w-full p-2 flex-auto';

    $: !types.includes(type) ? type = 'text' : null;
</script>

<div class:disabled>
    {#if label}
        <label class="block" for={id}>
            <Label text="{label}" bold />
        </label>
    {/if}
    <div class="input rounded shadow mt-2 mb-4 overflow-hidden flex" >
        {#if type === 'text'}
            <input class={klass} type="text" {name} {id} {required} {disabled} {placeholder} bind:value
                   on:blur
                   on:change
                   on:focus
                   on:select
                   on:submit
                   on:reset
                   on:keydown
                   on:keypress
                   on:keyup
            />
        {:else if type === 'email'}
            <input class={klass} type="email" {name} {id} {required} {disabled} {placeholder} bind:value
                   on:blur
                   on:change
                   on:focus
                   on:select
                   on:submit
                   on:reset
                   on:keydown
                   on:keypress
                   on:keyup
            />
        {:else if type === 'search'}
            <input class={klass} type="search" {name} {id} {required} {disabled} {placeholder} bind:value
                   on:blur
                   on:change
                   on:focus
                   on:select
                   on:submit
                   on:reset
                   on:keydown
                   on:keypress
                   on:keyup
            />
        {:else if type === 'password'}
            <input class={klass} type="password" {name} {id} {required} {disabled} {placeholder} bind:value
                   on:blur
                   on:change
                   on:focus
                   on:select
                   on:submit
                   on:reset
                   on:keydown
                   on:keypress
                   on:keyup
            />
        {:else if type === 'date'}
            <input class={klass} type="date" {name} {id} {required} {disabled} {placeholder} bind:value
                   on:blur
                   on:change
                   on:focus
                   on:select
                   on:submit
                   on:reset
                   on:keydown
                   on:keypress
                   on:keyup
            />
        {:else if type === 'textarea'}
            <textarea class={klass} {name} {id} {required} {disabled} {placeholder} bind:value
                      on:blur
                      on:change
                      on:focus
                      on:select
                      on:submit
                      on:reset
                      on:keydown
                      on:keypress
                      on:keyup
            ></textarea>
        {/if}
        <div class="">
            <slot name="right" />
        </div>
    </div>
</div>
