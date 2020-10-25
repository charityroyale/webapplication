import React from 'react'
import { GlobalStyle } from '../styles/global.styles'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/Theme'
import Layout from './components/Layout'
import Header from './components/Header'

export interface InitialAppProps {
	userAgent?: string
}

const App = (): JSX.Element => {
	return (
		<div>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Layout>
					<Header>
						<p>Hallo Left</p>
						<p>Hallo Center</p>
						<p>Hallo Right</p>
					</Header>
					<main>I am the main content</main>
					<footer>I am the footer</footer>
				</Layout>
			</ThemeProvider>
		</div>
	)
}

export default App
