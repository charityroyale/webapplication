import React from 'react'
import { StyledUpcoming } from '../../styles/common.styles'
import UpcomingStream, { UpcomingStreamProps } from './UpcomingStream'

interface UpcomingStreams {
	shedule: UpcomingStreamProps[]
}

const UpcomingFeatures: React.FunctionComponent<UpcomingStreams> = ({ shedule }: UpcomingStreams) => {
	return (
		<StyledUpcoming>
			{shedule.map((stream, index) => {
				return <UpcomingStream key={index} {...stream} />
			})}
		</StyledUpcoming>
	)
}

export default UpcomingFeatures
