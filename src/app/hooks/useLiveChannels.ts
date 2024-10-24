import useSWR from 'swr'
import { statsApi } from '../../config'
import { CmsUpcomingStreamer, upcomingStreamers } from '../cms/cms'

const fetcher = (url: string) =>
	fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	}).then((res) => res.json())

const channelsParam = (streamers: CmsUpcomingStreamer[]) => {
	const channels = streamers.map((streamer) => streamer.streamerChannel)
	return channels.join(',')
}

const getUpcomingStreamers = (allStreamers: CmsUpcomingStreamer[]) => {
	const now = new Date()
	const todayMorningZero = new Date(now)
	todayMorningZero.setHours(0, 0, 0, 0)
	const twentyFourHoursFromStartDate = new Date(now)
	twentyFourHoursFromStartDate.setHours(now.getHours() + 24)

	return allStreamers.filter((item) => {
		const startDate = new Date(item.date)

		// Only allow the following streamers:
		// - Start date is on the same day as today (not tomorrow)
		// - Start date is on or after today at 0:00:00
		// - Start date is before 24 hours from now
		return (
			startDate.getDate() === todayMorningZero.getDate() &&
			startDate >= todayMorningZero &&
			startDate < twentyFourHoursFromStartDate
		)
	})
}

export const useLiveChannels = () => {
	const liveNow = getUpcomingStreamers(upcomingStreamers ?? [])

	if (!liveNow || liveNow.length < 1) {
		return {
			liveChannelsData: [],
			liveChannelsDataIsLoading: false,
			liveChannelsDataIsError: true,
		}
	}

	const { data, error } = useSWR<LiveChannelsResponse>(
		`${statsApi.liveStreamsUrl}?channels=${channelsParam(liveNow)}`,
		fetcher,
		{
			refreshInterval: statsApi.refreshInterval,
		}
	)

	return {
		liveChannelsData: data?.data ?? [],
		liveChannelsDataIsLoading: !error && !data,
		liveChannelsDataIsError: !!error,
	}
}

interface LiveChannelsResponse {
	data: LiveChannels[]
	pagination: unknown // YAGNI, max 100 channels per page
}

interface LiveChannels {
	id: string
	user_id: string
	user_login: string
	user_name: string
	game_id: string
	game_name: string
	type: string
	title: string
	viewer_count: number
	started_at: string // date, '2023-09-22T10:05:20Z'
	language: string
	thumbnail_url: string
	tag_ids: unknown // YAGNI
	tags: string[]
	is_mature: boolean
}
