import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import cmsContent from '../../_posts/frontpage/charity-royale.md'
import Head from 'next/head'
import MainLayout from '../app/layouts/MainLayout'
import PageWithLayoutType from '../app/types/PageWithLayout'
import FeaturedStream from '../app/components/FeaturedStream'
import UpcomingFeatures from '../app/components/UpcomingStreams'
import { UpcomingStreamProps } from '../app/components/UpcomingStream'
import { fetchTwitchUsersBySchedule } from '../app/utils/commonUtils'
import ComingSoonLayout from '../app/layouts/ComingSoonLayout'

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
			<>
				<FeaturedStream channel={featuredStream} />
				<UpcomingFeatures schedule={schedule} />
			</>
		</>
	)
}

export const getStaticProps: GetStaticProps<InitialAppProps> = async () => {
	const schedule = cmsContent.attributes.upcoming
	const featuredStream = cmsContent.attributes.featuredStream
	const twitchUsers = (await fetchTwitchUsersBySchedule(schedule)).data

	for (let i = 0; i < twitchUsers.length; i++) {
		schedule[i].imgUrl = twitchUsers[i].profile_image_url
	}

	return {
		props: { schedule, featuredStream },
	}
}
;(IndexPage as PageWithLayoutType).layout = websiteReleased ? MainLayout : ComingSoonLayout

export default IndexPage
