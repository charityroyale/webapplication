import React from 'react'
import {
	StyledKalenderDownloadLink,
	StyledPast,
	StyledUpcoming,
	StylePastStreamsHeader,
	StyleUpcomingStreamsHeader,
	StyleUpcomingStreamsTitle,
} from '../../styles/common.styles'
import useMakeAWish from '../hooks/useMakeAWish'
import { CmsUpcomingStreamer } from '../cms/cms'
import UpcomingStream from './UpcomingStream/UpcomingStream'
import { Text } from './Text'
import { MakeAWishWishDTO } from '../dto/MakeAWishDonationsDTO'

interface UpcomingStreams {
	schedule: CmsUpcomingStreamer[]
}

const UpcomingFeatures: React.FunctionComponent<UpcomingStreams> = ({ schedule }: UpcomingStreams) => {
	const makeAWish = useMakeAWish()

	const getStreamEndDate = (stream: CmsUpcomingStreamer) => {
		const startDate = new Date(stream.date)
		const hoursToAdd = 12
		return new Date(startDate.getTime() + hoursToAdd * 3600000)
	}
	const now = new Date()
	const isInThePast = (stream: CmsUpcomingStreamer) => now > getStreamEndDate(stream)
	const isInTheFuture = (stream: CmsUpcomingStreamer) => now <= getStreamEndDate(stream)

	const createUpcomingStream = (stream: CmsUpcomingStreamer, index: number) => {
		let donationGoal = '0'
		let donationProgess = '0'
		if (!makeAWish.isError && !makeAWish.isLoading) {
			const makeAWishProject: MakeAWishWishDTO | undefined = makeAWish.data.wishes[stream.wishes[0]]
			if (makeAWishProject) {
				donationGoal = makeAWish.data.wishes[stream.wishes[0]].donation_goal
				donationProgess = makeAWish.data.streamers[stream.streamerChannel].wishes[stream.wishes[0]]
					? makeAWish.data.streamers[stream.streamerChannel].wishes[stream.wishes[0]].current_donation_sum
					: '0'
			}
		}
		return (
			<UpcomingStream
				projectDone={isInThePast(stream)}
				key={index}
				{...stream}
				donationProgress={donationProgess}
				donationGoal={donationGoal}
			/>
		)
	}

	return (
		<React.Fragment>
			{schedule.filter(isInTheFuture).length > 0 && (
				<>
					<StyleUpcomingStreamsHeader>
						<StyleUpcomingStreamsTitle>
							<Text content="scheduledStreamsTitle" />
						</StyleUpcomingStreamsTitle>
						<p>
							<Text content="downloadScheduleTitle" />{' '}
							<StyledKalenderDownloadLink aria-describedby="Programm als Kalender" href={`/calendar/all.ics`}>
								<Text content="downloadCTA" />
							</StyledKalenderDownloadLink>
							.
						</p>
					</StyleUpcomingStreamsHeader>
					<StyledUpcoming>{schedule.filter(isInTheFuture).map(createUpcomingStream)}</StyledUpcoming>
				</>
			)}
			{schedule.filter(isInThePast).length > 0 && (
				<>
					<StylePastStreamsHeader>
						<StyleUpcomingStreamsTitle>
							<Text content="pastStreamsTitle" />
						</StyleUpcomingStreamsTitle>
					</StylePastStreamsHeader>
					<StyledPast>{schedule.filter(isInThePast).map(createUpcomingStream)}</StyledPast>
				</>
			)}
			{schedule.length === 0 && (
				<StylePastStreamsHeader>
					<StyleUpcomingStreamsTitle>Streams TBA</StyleUpcomingStreamsTitle>
				</StylePastStreamsHeader>
			)}
		</React.Fragment>
	)
}

export default UpcomingFeatures
