import React, { FunctionComponent } from 'react'
import Layout from './components/Layout'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import FeaturedStream from './components/FeaturedStream'
import UpcomingFeatures from './components/UpcomingStreams'
import { UpcomingStreamProps } from './components/UpcomingStream'

export interface InitialAppProps {
	featuredStream?: string
	shedule?: UpcomingStreamProps[]
}

const App: FunctionComponent<InitialAppProps> = ({ shedule, featuredStream }: InitialAppProps): JSX.Element => {
	return (
		<div>
			<Layout>
				<Header />
				<Main>
					<FeaturedStream channel={featuredStream} />
					<UpcomingFeatures shedule={shedule} />
				</Main>
				<Footer>
					<p>Hallo Left</p>
					<p>Hallo Right</p>
				</Footer>
			</Layout>
		</div>
	)
}

export default App
