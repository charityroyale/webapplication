import React, { FunctionComponent } from 'react'
import Layout from './components/Layout'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import FeaturedStream from './components/FeaturedStream'
import UpcomingFeatures from './components/UpcomingStreams'
import { UpcomingStreamProps } from './components/UpcomingStream'
import { DonateButton } from '../styles/common.styles'

export interface InitialAppProps {
	featuredStream?: string
	shedule?: UpcomingStreamProps[]
}

const App: FunctionComponent<InitialAppProps> = ({ shedule, featuredStream }: InitialAppProps): JSX.Element => {
	return (
		<div>
			<Layout>
				<Header>
					<p>Hallo Left</p>
					<p>Hallo Center</p>
					<DonateButton aria-label="Jetzt Spenden">SPENDEN</DonateButton>
				</Header>
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
