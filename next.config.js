module.exports = {
	webpack: (cfg) => {
		cfg.module.rules.push({
			test: /\.md$/,
			loader: 'frontmatter-markdown-loader',
			options: { mode: ['react-component'] },
		})
		return cfg
	},
	env: {
		TWITCH_ACCESS_TOKEN: '',
		TWITCH_CLIENT_ID: '',
	},
}
