import React from 'react'
import { GlobalStyle } from '../styles/global.styles'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/Theme'
import Layout from './components/Layout'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import FeaturedStream from './components/FeaturedStream'
import UpcomingFeatures from './components/UpcomingStreams'

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
					<Main>
						<FeaturedStream />
						<UpcomingFeatures />
					</Main>
					<Footer>
						<p>Hallo Left</p>
						<p>Hallo Right</p>
					</Footer>
				</Layout>
			</ThemeProvider>
		</div>
	)
}

export default App
