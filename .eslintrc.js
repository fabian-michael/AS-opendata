module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	env: {
		es6: true,
		browser: true,
	},
	plugins: ['prettier', '@typescript-eslint', 'svelte3'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
	rules: {
		'prettier/prettier': 'error',
	},
	settings: {
		'svelte3/ignore-styles': () => true,
	},
};
