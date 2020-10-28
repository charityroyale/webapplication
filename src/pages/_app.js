/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React from 'react'
import { GlobalStyle } from '../styles/global.styles'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/Theme'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

export default MyApp
