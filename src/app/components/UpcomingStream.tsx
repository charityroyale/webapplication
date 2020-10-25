import React, { FunctionComponent } from 'react'
import { StyledUpcomingStream } from '../../styles/common.styles'
export interface UpcomingStreamProps {
	streamLink: string
	descripion: string
	imgUrl: string
	donationGoal: number
	donationProgress: number
}

const UpcomingStream: FunctionComponent<UpcomingStreamProps> = ({
	streamLink,
	descripion,
	imgUrl,
	donationGoal,
	donationProgress,
}: UpcomingStreamProps) => {
	return (
		<StyledUpcomingStream>
			<div>{streamLink}</div>
			<div>{descripion}</div>
			<div>{imgUrl}</div>
			<div>{donationGoal}</div>
			<div>{donationProgress}</div>
		</StyledUpcomingStream>
	)
}

export default UpcomingStream
