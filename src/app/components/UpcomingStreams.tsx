import React from 'react'
import {
	StyledKalenderDownloadLink,
	StyledUpcoming,
	StyleUpcomingStreamsHeader,
	StyleUpcomingStreamsTitle,
} from '../../styles/common.styles'
import useMakeAWish from '../hooks/useMakeAWish'
import UpcomingStream, { UpcomingStreamProps } from './UpcomingStream'

interface UpcomingStreams {
	schedule: UpcomingStreamProps[]
}

const UpcomingFeatures: React.FunctionComponent<UpcomingStreams> = ({ schedule }: UpcomingStreams) => {
	const makeAWish = useMakeAWish()

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
			<StyledUpcoming>
				{schedule.map((stream, index) => {
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
						<UpcomingStream key={index} {...stream} donationProgress={donationProgess} donationGoal={donationGoal} />
					)
				})}
			</StyledUpcoming>
		</React.Fragment>
	)
}

export default UpcomingFeatures
