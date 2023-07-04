'use client'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { LanguageProvider } from './LanguageProvider'
import { IpInfoProvider } from './IpInfoProvider'
import { crTheme } from '../../styles/Theme'
import { GlobalStyle } from '../../styles/global.styles'
import StyledComponentsRegistry from '../lib/registry'

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
