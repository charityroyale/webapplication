import React from 'react'
import App, { InitialAppProps } from '../app/App'
import { GetStaticProps, NextPage } from 'next'
import cmsContent from '../../_posts/frontpage/charity-royale.md'
import Head from 'next/head'
import { formatDate } from '../app/utils/formatUtils'

const IndexPage: NextPage<InitialAppProps> = (props: InitialAppProps) => {
	return (
		<>
			<Head>
				<title>Charity Royale 2020</title>
			</Head>
			<App {...props} />
		</>
	)
}

export const getStaticProps: GetStaticProps<InitialAppProps> = async () => {
	const schedule = cmsContent.attributes.upcoming
	const featuredStream = cmsContent.attributes.featuredStream
	for (const stream of schedule) {
		stream.date = formatDate(stream.date)
	}
	return {
		props: { shedule: schedule, featuredStream },
	}
}

export default IndexPage
