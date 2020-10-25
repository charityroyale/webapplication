import React from 'react'
import { StyledUpcoming, StyleUpcomingStreamsHeader } from '../../styles/common.styles'
import UpcomingStream, { UpcomingStreamProps } from './UpcomingStream'

interface UpcomingStreams {
	shedule: UpcomingStreamProps[]
}

const UpcomingFeatures: React.FunctionComponent<UpcomingStreams> = ({ shedule }: UpcomingStreams) => {
	return (
		<React.Fragment>
			<StyleUpcomingStreamsHeader>Programm</StyleUpcomingStreamsHeader>
			<StyledUpcoming>
				{shedule.map((stream, index) => {
					return <UpcomingStream key={index} {...stream} />
				})}
			</StyledUpcoming>
		</React.Fragment>
	)
}

export default UpcomingFeatures
