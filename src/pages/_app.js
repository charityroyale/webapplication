/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { GlobalStyle } from '../styles/global.styles'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/Theme'
import { useIsSSR } from '../app/components/isSSR'
import { isClientSideIE } from '../app/utils/commonUtils'
import InternetExplorerNotSupported from '../app/components/InternetExplorerNotSupported'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
	const Layout = Component.layout ? Component.layout : React.Fragment
	const isSSR = useIsSSR()
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				{!isSSR && isClientSideIE() ? (
					<InternetExplorerNotSupported />
				) : (
					<Layout {...pageProps}>
						<Component {...pageProps} />
					</Layout>
				)}
			</ThemeProvider>
		</>
	)
}

export default MyApp
