import React from 'react'
import App, { InitialAppProps } from '../app/App'
import { NextPage } from 'next'

const IndexPage: NextPage<InitialAppProps> = (props: InitialAppProps) => {
	return <App {...props} />
}

IndexPage.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
	return { userAgent }
}

export default IndexPage
