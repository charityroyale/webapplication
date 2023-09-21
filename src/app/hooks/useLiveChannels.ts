import useSWR from 'swr'
import { statsApi } from '../../config'
import { upcomingStreamers } from '../cms/cms'

const fetcher = (url: string) =>
	fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	}).then((res) => res.json())

const channelsParam = () => {
	const channels = upcomingStreamers.map((streamer) => streamer.streamerChannel)
	return channels.join(',')
}

export const useLiveChannels = () => {
	console.log(channelsParam())
	const { data, error } = useSWR<any>(`${statsApi.liveStreamsUrl}?channels=${channelsParam()}`, fetcher, {
		refreshInterval: statsApi.refreshInterval,
	})

	return {
		liveChannelsData: data as any,
		liveChannelsDataIsLoading: !error && !data,
		liveChannelsDataIsError: !!error,
	}
}
