import React from 'react'
import { StyledUpcoming, StyleUpcomingStreamsHeader } from '../../styles/common.styles'
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
				Programm<a href={`/calendar/all.ics`}>Calendar</a>
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
