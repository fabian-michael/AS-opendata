import 'core-js/stable';
import 'regenerator-runtime/runtime';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

import App from './App/index.svelte';
import '@Assets/css';

// Initialize gestures
import { gestures } from '@composi/gestures';
gestures();

// Initialize App
const app = new App({
    target: document.body
});

// @ts-ignore
window.app = app;

export default app;
