/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const fontDisplayOptions = {
	swap: 'swap',
	auto: 'auto',
	block: 'block',
	fallback: 'fallback',
	optional: 'optional',
}

const fontDisplay = fontDisplayOptions.block

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<React.Fragment>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</React.Fragment>
				),
			}
		} catch (error) {
			console.error(error)
		} finally {
			sheet.seal()
		}
	}

	render() {
		return (
			<Html lang="de">
				<Head>
					<link
						href={`https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=${fontDisplay}`}
						rel="stylesheet"
					></link>
					<link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png"></link>
					<link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png"></link>
					<link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"></link>
					<link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"></link>
					<link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"></link>
					<link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"></link>
					<link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"></link>
					<link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"></link>
					<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"></link>
					<link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png"></link>
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"></link>
					<link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png"></link>
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"></link>
					<link rel="manifest" href="/favicon/manifest.json"></link>
					<meta name="msapplication-TileColor" content="#ffffff"></meta>
					<meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png"></meta>
					<meta name="theme-color" content="#ffffff"></meta>
					<meta
						name="description"
						content="Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben."
					></meta>
					<script src="https://embed.twitch.tv/embed/v1.js"></script>
					<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
