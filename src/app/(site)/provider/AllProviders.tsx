'use client'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { crTheme } from '../../../styles/Theme'
import { GlobalStyle } from '../../../styles/global.styles'
import StyledComponentsRegistry from '../../lib/registry'
import { LanguageProvider } from './LanguageProvider'
import { IpInfoProvider } from './IpInfoProvider'

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<StyledComponentsRegistry>
			<GlobalStyle />
			<LanguageProvider>
				<IpInfoProvider>
					<ThemeProvider theme={crTheme}>{children}</ThemeProvider>
				</IpInfoProvider>
			</LanguageProvider>
		</StyledComponentsRegistry>
	)
}
