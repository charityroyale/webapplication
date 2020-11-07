import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import cmsContent from '../../_posts/frontpage/charity-royale.md'
import Head from 'next/head'
import { StyledWebsiteInProgress } from '../styles/common.styles'
import MainLayout from '../app/layouts/MainLayout'
import PageWithLayoutType from '../app/types/PageWithLayout'
import FeaturedStream from '../app/components/FeaturedStream'
import UpcomingFeatures from '../app/components/UpcomingStreams'
import { UpcomingStreamProps } from '../app/components/UpcomingStream'

export interface InitialAppProps {
	featuredStream?: string
	schedule?: UpcomingStreamProps[]
}

const websiteReleased = true

const IndexPage: NextPage<InitialAppProps> = (props: InitialAppProps) => {
	const { schedule, featuredStream } = props
	return (
		<>
			<Head>
				<title>Charity Royale 2020</title>
			</Head>
			{websiteReleased ? (
				<>
					<FeaturedStream channel={featuredStream} />
					<UpcomingFeatures schedule={schedule} />
				</>
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
		props: { schedule, featuredStream },
	}
}
;(IndexPage as PageWithLayoutType).layout = MainLayout

export default IndexPage
