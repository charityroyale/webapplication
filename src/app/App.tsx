import React from 'react'
import Title from './components/Title'
import { GlobalStyle } from '../styles/global.styles'

export interface InitialAppProps {
	userAgent?: string
}

const App = ({ userAgent }: InitialAppProps): JSX.Element => {
	return (
		<div>
			<GlobalStyle />
			<React.Fragment>
				<Title text={`Hi, you are using ${userAgent}`} />
			</React.Fragment>
		</div>
	)
}

export default App
