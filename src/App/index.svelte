<script>
    import Layout from '@Components/Layout';
    import ImageExample from '@Components/ImageExample';
    import HelloWorld from '@Components/HelloWorld';
</script>

<style lang="scss">
    .container {
        background-color: #2c3e50;
        display: flex;
        flex-direction: column;
        flex: 1 1 100%;
        justify-content: flex-start;
        align-items: center;
        min-height: 100vh;

        &__top {
            margin: 100px;
        }

        &__middle {
            display: flex;
            flex: 1 1 100%;
            justify-content: center;
            align-items: flex-start;
        }
    }
</style>

<Layout>
    <div class="container">
        <div class="container__top">
            <ImageExample />
        </div>
        <div class="container__middle">
            <HelloWorld />
        </div>
    </div>
</Layout>
