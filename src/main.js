import App from './App/index.svelte';
import '@Assets/css/global.scss';
import '@Assets/css/typography.scss';
import '@Assets/css/utilities.scss';


const app = new App({
    target: document.body
});

window.app = app;

export default app;
