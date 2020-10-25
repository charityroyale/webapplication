import React from 'react'
import App, { InitialAppProps } from '../app/App'
import { NextPage } from 'next'
import shedule from '../../shedule.json'

const IndexPage: NextPage<InitialAppProps> = (props: InitialAppProps) => {
	return <App {...props} />
}

IndexPage.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
	return {
		shedule: shedule,
		userAgent,
	}
}

export default IndexPage
