'use client'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { crTheme } from '../../../styles/Theme'
import { GlobalStyle } from '../../../styles/global.styles'
import StyledComponentsRegistry from '../../lib/registry'
import { LanguageProvider } from './LanguageProvider'

export const CrThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<StyledComponentsRegistry>
			<GlobalStyle />
			<LanguageProvider>
				<ThemeProvider theme={crTheme}>{children}</ThemeProvider>
			</LanguageProvider>
		</StyledComponentsRegistry>
	)
}
