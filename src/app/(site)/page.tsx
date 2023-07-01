'use client'
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
	// TODO: really? looks fishy
	// do not refetch und clientside (e.g. dev mode)
	if (typeof window !== undefined) return null
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
			<head>
				<title>Charity Royale</title>
				<meta name="twitter:card" content="summary" key="twcard" />
				<meta name="twitter:site" content={'@CharityRoyale'} key="twsite" />
				<meta name="twitter:creator" content={'@CharityRoyale'} key="twcreator" />

				<meta property="og:url" content={'https://charityroyale.at/'} key="ogurl" />
				<meta
					property="og:image"
					content={'https://charityroyale.at/uploads/charity_royale_rgb_300x300.png'}
					key="ogimage"
				/>
				<meta property="og:image:width" content={'300'} key="ogimagewidth" />
				<meta property="og:image:height" content={'300'} key="ogimageheight" />
				<meta property="og:site_name" content={'Charity Royale'} key="ogsitename" />
				<meta property="og:title" content={'Charity Royale'} key="ogtitle" />
				<meta property="og:type" content={'website'} key="ogtype" />
				<meta property="og:locale" content={'de_AT'} key="oglocale" />
				<meta property="fb:app_id" content={process.env.FB_ID} key="fbappid" />
				<meta
					property="og:description"
					content={'Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.'}
					key="ogdesc"
				/>
			</head>
			<React.Fragment>
				<ButtonsBox />
				<FeaturedStream
					twitchChannelName={cmsContent.featuredStream}
					youtubeUrl={cmsContent.featuredYoutubeStream}
				/>
				<StreamSchedule schedules={schedules} />
			</React.Fragment>
		</React.Fragment>
	)
}
