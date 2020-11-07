import React from 'react'
import { StyledUpcoming, StyleUpcomingStreamsHeader } from '../../styles/common.styles'
import UpcomingStream, { UpcomingStreamProps } from './UpcomingStream'

interface UpcomingStreams {
	schedule: UpcomingStreamProps[]
}

const UpcomingFeatures: React.FunctionComponent<UpcomingStreams> = ({ schedule }: UpcomingStreams) => {
	return (
		<React.Fragment>
			<StyleUpcomingStreamsHeader>Programm</StyleUpcomingStreamsHeader>
			<StyledUpcoming>
				{schedule.map((stream, index) => {
					return <UpcomingStream key={index} {...stream} />
				})}
			</StyledUpcoming>
		</React.Fragment>
	)
}

export default UpcomingFeatures
