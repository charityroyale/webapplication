import React, { useCallback, useEffect, useState } from 'react'
import { StyledUpcoming, StyleUpcomingStreamsHeader } from '../../styles/common.styles'
import { fetchTwitchStreamBySchedule, getLoginDisplayNameFromTwitchURI } from '../utils/commonUtils'
import { useIsSSR } from './isSSR'
import UpcomingStream, { UpcomingStreamProps } from './UpcomingStream'

interface UpcomingStreams {
	schedule: UpcomingStreamProps[]
}
interface LiveChannels {
	[Key: string]: boolean
}

const UpcomingFeatures: React.FunctionComponent<UpcomingStreams> = ({ schedule }: UpcomingStreams) => {
	const [liveChannelsLoaded, setLiveChannelsLoaded] = useState(false)
	const [currentLiveChannels, setCurrentLiveChannels] = useState<LiveChannels>({})
	const isSSR = useIsSSR()

	useEffect(() => {
		const timer = setTimeout(async () => {
			const live_channels = (await fetchTwitchStreamBySchedule(schedule)).data
			const new_live_channels = {}
			for (const live_channel of live_channels) {
				new_live_channels[live_channel.user_name.toLowerCase()] = true
			}
			setCurrentLiveChannels(new_live_channels)
		}, 2000) // secs
		return () => clearTimeout(timer)
	}, [])

	const fetchAndSetLiveChannels = useCallback(async () => {
		const live_channels = (await fetchTwitchStreamBySchedule(schedule)).data
		const new_live_channels = {}
		for (const live_channel of live_channels) {
			new_live_channels[live_channel.user_name.toLowerCase()] = true
		}
		setLiveChannelsLoaded(true)
		setCurrentLiveChannels(new_live_channels)
	}, [])

	if (!liveChannelsLoaded && !isSSR) {
		fetchAndSetLiveChannels()
		return null
	}

	return (
		<React.Fragment>
			<StyleUpcomingStreamsHeader>Programm</StyleUpcomingStreamsHeader>
			<StyledUpcoming>
				{schedule.map((stream, index) => {
					return (
						<UpcomingStream
							key={index}
							is_live={currentLiveChannels[getLoginDisplayNameFromTwitchURI(stream.streamLink)]}
							{...stream}
						/>
					)
				})}
			</StyledUpcoming>
		</React.Fragment>
	)
}

export default UpcomingFeatures
