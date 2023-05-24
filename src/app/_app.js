/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { GlobalStyle } from '../styles/global.styles'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/Theme'
import { useIsSSR } from '../app/hooks/useIsSSR'
import { isClientSideIE } from '../app/utils/commonUtils'
import { LanguageProvider } from '../app/provider/LanguageProvider'
import { IpInfoProvider } from '../app/provider/IpInfoProvider'
import InternetExplorerNotSupported from '../app/components/InternetExplorerNotSupported'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
	const Layout = Component.layout ? Component.layout : React.Fragment
	const isSSR = useIsSSR()
	return (
		<React.Fragment>
			<GlobalStyle />
			<LanguageProvider>
				<IpInfoProvider>
					<ThemeProvider theme={theme}>
						{!isSSR && isClientSideIE() ? (
							<InternetExplorerNotSupported />
						) : (
							<Layout {...pageProps}>
								<Component {...pageProps} />
							</Layout>
						)}
					</ThemeProvider>
				</IpInfoProvider>
			</LanguageProvider>
		</React.Fragment>
	)
}

export default MyApp
