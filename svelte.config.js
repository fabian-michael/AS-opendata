const sveltePreprocess = require('svelte-preprocess');

module.exports = {
	emitCss: true,
	hotReload: true,
	preprocess: sveltePreprocess({
		scss: {
			renderSync: true
		}
	})
}