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
import { Upcoming } from '../cms/cms'
import UpcomingStream from './UpcomingStream/UpcomingStream'

interface UpcomingStreams {
	schedule: Upcoming[]
}

const UpcomingFeatures: React.FunctionComponent<UpcomingStreams> = ({ schedule }: UpcomingStreams) => {
	const makeAWish = useMakeAWish()

	const getStreamEndDate = (stream: Upcoming) => {
		const startDate = new Date(stream.date)
		const hoursToAdd = 6
		return new Date(startDate.getTime() + hoursToAdd * 3600000)
	}
	const now = new Date()
	const isInThePast = (stream: Upcoming) => now > getStreamEndDate(stream)
	const isInTheFuture = (stream: Upcoming) => now <= getStreamEndDate(stream)

	const createUpcomingStream = (stream: Upcoming, index: number) => {
		let donationGoal = '0'
		let donationProgess = '0'
		if (!makeAWish.isError && !makeAWish.isLoading) {
			const makeAWishProject = makeAWish.data.projects[stream.makeAWishProjectId]
			if (makeAWishProject) {
				donationGoal = makeAWishProject.donation_goal
				donationProgess = makeAWishProject.current_donation_sum
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
			<StyleUpcomingStreamsHeader>
				<StyleUpcomingStreamsTitle>Programm</StyleUpcomingStreamsTitle>
				<p>
					Aktuelles Programm als Kalenderdatei{' '}
					<StyledKalenderDownloadLink aria-describedby="Programm als Kalender" href={`/calendar/all.ics`}>
						herunterladen
					</StyledKalenderDownloadLink>
					.
				</p>
			</StyleUpcomingStreamsHeader>
			<StyledUpcoming>{schedule.filter(isInTheFuture).map(createUpcomingStream)}</StyledUpcoming>

			<StylePastStreamsHeader>
				<StyleUpcomingStreamsTitle>Vergangene Streams</StyleUpcomingStreamsTitle>
			</StylePastStreamsHeader>
			<StyledPast>{schedule.filter(isInThePast).map(createUpcomingStream)}</StyledPast>
		</React.Fragment>
	)
}

export default UpcomingFeatures
