import React from 'react'
import App, { InitialAppProps } from '../app/App'
import { GetStaticProps, NextPage } from 'next'
import cmsContent from '../../_posts/frontpage/charity-royale.md'

const IndexPage: NextPage<InitialAppProps> = (props: InitialAppProps) => {
	return <App {...props} />
}

export const getStaticProps: GetStaticProps<InitialAppProps> = async () => {
	const schedule = cmsContent.attributes.upcoming
	const featuredStream = cmsContent.attributes.featuredStream
	return {
		props: { shedule: schedule, featuredStream },
	}
}

export default IndexPage
