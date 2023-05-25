'use client'

import React from 'react'
import StyledComponentsRegistry from './lib/registry'
import { GlobalStyle } from '../styles/global.styles'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/Theme'
import InternetExplorerNotSupported from './(site)/cms/components/InternetExplorerNotSupported'
import { isClientSideIE } from './(site)/utils/commonUtils'
import { useIsSSR } from './(site)/hooks/useIsSSR'

export const metadata = {
	title: 'Charity Royale',
	description: 'Charity Royale',
}

async function RootLayout({ children }: { children: React.ReactNode }) {
	const isSSR = useIsSSR()
	return (
		<html lang="de-AT">
			<body>
				<StyledComponentsRegistry>
					<React.Fragment>
						<GlobalStyle />
						<ThemeProvider theme={theme}>
							{!isSSR && isClientSideIE() ? <InternetExplorerNotSupported /> : children}
						</ThemeProvider>
					</React.Fragment>
				</StyledComponentsRegistry>
			</body>
		</html>
	)
}

export default RootLayout
