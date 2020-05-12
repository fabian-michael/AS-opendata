module.exports = {
	presets: [
		['@babel/preset-env', {
			useBuiltIns: 'usage',
			corejs: '3.6'
		}],
	],
	plugins: [
		'inline-dotenv',
		'@babel/plugin-transform-strict-mode'
	],
};
