'use client'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { LanguageProvider } from './LanguageProvider'
import { crTheme } from '../../styles/Theme'
import { GlobalStyle } from '../../styles/global.styles'
import StyledComponentsRegistry from '../lib/registry'

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<StyledComponentsRegistry>
			<GlobalStyle />
			<LanguageProvider>
				<ThemeProvider theme={crTheme}>{children}</ThemeProvider>
			</LanguageProvider>
		</StyledComponentsRegistry>
	)
}
