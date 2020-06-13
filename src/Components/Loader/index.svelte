<script>
    export let color = 'black';
    export let size = '100px';
</script>

<div class="loader">
    <svg class="circular" viewBox="25 25 50 50" width="{size}" height="{size}">
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke="{color}" stroke-width="2" stroke-miterlimit="10"/>
    </svg>
</div>

<style lang="scss">
    .loader {
        position: relative;
        margin: 0 auto;
    }

    .circular {
        animation: rotate 2s linear infinite;
        transform-origin: center center;
    }

    .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
</style>