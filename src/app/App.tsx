import React from 'react'
import Title from './components/Title'
import { GlobalStyle } from '../styles/global.styles'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/Theme'

export interface InitialAppProps {
	userAgent?: string
}

const App = ({ userAgent }: InitialAppProps): JSX.Element => {
	return (
		<div>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<React.Fragment>
					<Title text={`Hi, you are using ${userAgent}`} />
				</React.Fragment>
			</ThemeProvider>
		</div>
	)
}

export default App
