import React from 'react'
import cmsContent, { StreamerType, CmsUpcomingStreamer } from './cms/cms'
import ButtonsBox from './cms/components/FaqBox'
import FeaturedStream from './cms/components/FeatureStream/FeaturedStream'
import { StreamSchedule } from './cms/components/StreamSchedule/StreamSchedule'
import { TwitchUserDTO } from './dto/TwitchUserDTO'
import { fetchTwitchUsersBySchedule } from './utils/commonUtils'

export type CmsSchedulesType = { [key in StreamerType]: CmsUpcomingStreamer[] }

export interface IndexPageProps {
	featuredStream: string
	featuredYoutubeStream?: string
	schedules: CmsSchedulesType
}

const getTwitchUsers = async (schedule: CmsUpcomingStreamer[]) => {
	return (await fetchTwitchUsersBySchedule(schedule))?.data ?? null
}

export default async function Page() {
	const schedule = cmsContent.upcoming ?? []
	const twitchUsers: TwitchUserDTO[] | null = await getTwitchUsers(schedule)

	const twitchUsersDict: { [userid: string]: TwitchUserDTO } = {}
	if (twitchUsers) {
		for (const twitchUser of twitchUsers) {
			twitchUsersDict[twitchUser.login] = twitchUser
		}
	}

	for (const stream of schedule) {
		stream.imgUrl = twitchUsersDict[stream.streamerChannel]
			? twitchUsersDict[stream.streamerChannel].profile_image_url
			: ''
	}

	const schedules: CmsSchedulesType = {
		main: schedule.filter((scheduledStream) => scheduledStream.type === 'main'),
		community: schedule.filter((scheduledStream) => scheduledStream.type === 'community'),
	}

	return (
		<React.Fragment>
			<ButtonsBox />
			<FeaturedStream
				twitchChannelName={cmsContent.featuredStream}
				youtubeUrl={cmsContent.featuredYoutubeStream}
			/>
			<StreamSchedule schedules={schedules} />
		</React.Fragment>
	)
}
