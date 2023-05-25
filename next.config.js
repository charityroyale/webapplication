/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	/**
	 * This is that we tell the `next build` command
	 * to statically export all pages to the `out` directory
	 */
	output: 'export',
	// Optional: Add a trailing slash to all paths `/about` -> `/about/`
	// trailingSlash: true,
	// Optional: Change the output directory `out` -> `dist`
	// distDir: 'dist',
	webpack: (cfg) => {
		cfg.module.rules.push({
			test: /\.md$/,
			loader: 'frontmatter-markdown-loader',
			options: { mode: ['react-component'] },
		})
		return cfg
	},
	productionBrowserSourceMaps: true,
	// see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
	// https://github.com/vercel/next.js/issues/30802
	compiler: { styledComponents: { ssr: true } },
}

module.exports = nextConfig
