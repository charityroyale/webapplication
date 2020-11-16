import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import rawCmsContent from '../../_posts/frontpage/charity-royale.md'
import Head from 'next/head'
import MainLayout from '../app/layouts/MainLayout'
import PageWithLayoutType from '../app/types/PageWithLayout'
import FeaturedStream from '../app/components/FeaturedStream'
import UpcomingFeatures from '../app/components/UpcomingStreams'
import { fetchTwitchUsersBySchedule } from '../app/utils/commonUtils'
import ComingSoonLayout from '../app/layouts/ComingSoonLayout'
import FaqBox from '../app/components/FaqBox'
import { CmsContent, Upcoming } from '../app/types/CmsContent'

export interface InitialAppProps {
	featuredStream?: string
	schedule?: Upcoming[]
}

const cmsContent = rawCmsContent.attributes as CmsContent
const websiteReleased = true

const IndexPage: NextPage<InitialAppProps> = (props: InitialAppProps) => {
	const { schedule, featuredStream } = props
	return (
		<>
			<Head>
				<title>Charity Royale 2020</title>
			</Head>
			<>
				<FaqBox />
				<FeaturedStream channel={featuredStream} />
				<UpcomingFeatures schedule={schedule} />
			</>
		</>
	)
}

export const getStaticProps: GetStaticProps<InitialAppProps> = async () => {
	const schedule = cmsContent.upcoming
	const featuredStream = cmsContent.featuredStream
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
