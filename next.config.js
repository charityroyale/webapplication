/**
 * @type {import('next').NextConfig}
 */
export default {
	output: 'export',
	webpack: (cfg) => {
		cfg.module.rules.push({
			test: /\.md$/,
			loader: 'frontmatter-markdown-loader',
			options: { mode: ['react-component'] },
		})
		return cfg
	},
	productionBrowserSourceMaps: true,
	compiler: { styledComponents: { ssr: true } },
}
