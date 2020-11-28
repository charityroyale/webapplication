import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import MainLayout from '../app/layouts/MainLayout'
import PageWithLayoutType from '../app/types/PageWithLayout'
import FeaturedStream from '../app/components/FeaturedStream'
import UpcomingFeatures from '../app/components/UpcomingStreams'
import { fetchTwitchUsersBySchedule } from '../app/utils/commonUtils'
import ComingSoonLayout from '../app/layouts/ComingSoonLayout'
import FaqBox from '../app/components/FaqBox'
import cmsContent, { Upcoming } from '../app/cms/cms'
import { TwitchUserDTO } from '../app/dto/TwitchUserDTO'

export interface InitialAppProps {
	featuredStream?: string
	schedule?: Upcoming[]
}

const websiteReleased = false

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

	const twitchUsersDict: { [userid: string]: TwitchUserDTO } = {}
	for (const twitchUser of twitchUsers) {
		twitchUsersDict[twitchUser.login] = twitchUser
	}

	for (const stream of schedule) {
		stream.imgUrl = twitchUsersDict[stream.streamerChannel].profile_image_url
	}

	return {
		props: { schedule, featuredStream },
	}
}
;(IndexPage as PageWithLayoutType).layout = websiteReleased ? MainLayout : ComingSoonLayout

export default IndexPage
