'use client'
import React from 'react'
import StyledComponentsRegistry from './lib/registry'
import { GlobalStyle } from '../styles/global.styles'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/Theme'

export const metadata = {
	title: 'Charity Royale',
	description: 'Charity Royale',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de-AT">
			<body>
				<StyledComponentsRegistry>
					<React.Fragment>
						<GlobalStyle />
						<ThemeProvider theme={theme}>{children}</ThemeProvider>
					</React.Fragment>
				</StyledComponentsRegistry>
			</body>
		</html>
	)
}
