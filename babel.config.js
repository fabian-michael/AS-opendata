module.exports = {
	presets: [
		[

			'@babel/preset-env', {
				targets: {
					node: 'current',
				},
				useBuiltIns: 'entry',
				corejs: '3.6'
			}
		],
	],
	plugins: [
		'inline-dotenv',
		'@babel/plugin-transform-strict-mode',
		'@babel/plugin-transform-runtime'
	],
};
