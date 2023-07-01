'use client'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { crTheme } from '../../../styles/Theme'
import { GlobalStyle } from '../../../styles/global.styles'

export const CrThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<React.Fragment>
			<GlobalStyle />
			<ThemeProvider theme={crTheme}>{children}</ThemeProvider>
		</React.Fragment>
	)
}
