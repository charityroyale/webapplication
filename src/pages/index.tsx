import React from 'react'
import App, { InitialAppProps } from '../app/App'
import { GetStaticProps, NextPage } from 'next'
import cmsContent from '../../_posts/frontpage/charity-royale.md'
import Head from 'next/head'
import { StyledWebsiteInProgress } from '../styles/common.styles'

const websiteReleased = false

const IndexPage: NextPage<InitialAppProps> = (props: InitialAppProps) => {
	return (
		<>
			<Head>
				<title>Charity Royale 2020</title>
			</Head>
			{websiteReleased ? (
				<App {...props} />
			) : (
				<StyledWebsiteInProgress>
					<img width="250px" src="/Charity_Royale_RGB.png" alt="Charity Royale 2020" />
					<h1>Coming soon</h1>
				</StyledWebsiteInProgress>
			)}
		</>
	)
}

export const getStaticProps: GetStaticProps<InitialAppProps> = async () => {
	const schedule = cmsContent.attributes.upcoming
	const featuredStream = cmsContent.attributes.featuredStream
	return {
		props: { shedule: schedule, featuredStream },
	}
}

export default IndexPage
