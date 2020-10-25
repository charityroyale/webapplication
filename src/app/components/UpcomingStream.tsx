import React, { FunctionComponent } from 'react'
import dateFormat from 'dateformat'

import {
	StyledUpcomingStream,
	StyledUpcomingStreamPlaceholderImage,
	StyledUpcomingStreamFooter,
	StreamerIconWrapper,
	StyledDescriptionText,
	StreamProjectDateWrapper,
	StyledStreamerProjectHeader,
} from '../../styles/common.styles'
export interface UpcomingStreamProps {
	streamLink: string
	descripion: string
	imgUrl: string
	donationGoal: number
	donationProgress: number
	date: Date
}

const UpcomingStream: FunctionComponent<UpcomingStreamProps> = ({
	streamLink,
	descripion,
	imgUrl,
	date,
	donationGoal,
	donationProgress,
}: UpcomingStreamProps) => {
	return (
		<StyledUpcomingStream>
			<StyledStreamerProjectHeader>StrizzziTV</StyledStreamerProjectHeader>
			<a style={{ display: 'flex' }} href={streamLink} target="_blank" rel="noreferrer">
				<StyledUpcomingStreamPlaceholderImage src={`/Placeholder_Avatar.png`} alt="Logo für StreamProjekt" />
			</a>
			<StyledUpcomingStreamFooter>
				<StreamerIconWrapper>
					<a href={streamLink} target="_blank" rel="noreferrer">
						<img src={`/Charity_Royale_RGB.png`} alt="Logo des Streamers" />
					</a>
				</StreamerIconWrapper>

				<StreamProjectDateWrapper>
					<p>{dateFormat(date, "dddd 'um' HH:MM")}</p>
				</StreamProjectDateWrapper>
				<div>
					<StyledDescriptionText>Wish für {descripion}</StyledDescriptionText>
					<div>
						<p>{`${donationProgress} / ${donationGoal}`}</p>
					</div>
				</div>
			</StyledUpcomingStreamFooter>
		</StyledUpcomingStream>
	)
}

export default UpcomingStream
