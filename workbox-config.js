module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{png,html,json,js}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};