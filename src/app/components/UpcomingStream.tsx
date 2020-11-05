import React, { FunctionComponent, useCallback, useState } from 'react'

import {
	StyledUpcomingStream,
	StyledUpcomingStreamPlaceholderImage,
	StyledUpcomingStreamFooter,
	StreamerIconWrapper,
	StyledDescriptionText,
	StreamProjectDateWrapper,
	StyledStreamerProjectHeader,
} from '../../styles/common.styles'
import { formatDate } from '../utils/formatUtils'

export interface UpcomingStreamProps {
	streamerName: string
	streamLink: string
	descripion: string
	imgUrl: string
	donationGoal: number
	donationProgress: number
	date: Date
}

const UpcomingStream: FunctionComponent<UpcomingStreamProps> = ({
	streamerName,
	streamLink,
	descripion,
	imgUrl,
	date,
	donationGoal,
	donationProgress,
}: UpcomingStreamProps) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	const onLoad = useCallback(() => {
		setIsImageLoaded(true)
	}, [])

	return (
		<StyledUpcomingStream>
			<StyledStreamerProjectHeader>{streamerName}</StyledStreamerProjectHeader>
			<a style={{ display: 'flex' }} href={streamLink} target="_blank" rel="noreferrer">
				{!isImageLoaded && <div>LOADING</div>}
				<StyledUpcomingStreamPlaceholderImage
					onLoad={onLoad}
					src={`/Placeholder_Avatar.png`}
					alt="Logo für StreamProjekt"
				/>
			</a>
			<StyledUpcomingStreamFooter>
				<StreamerIconWrapper>
					<a href={streamLink} target="_blank" rel="noreferrer">
						<img src={imgUrl} alt="Logo des Streamers" />
					</a>
				</StreamerIconWrapper>

				<StreamProjectDateWrapper>
					<p>{formatDate(date)}</p>
				</StreamProjectDateWrapper>
				<div>
					<StyledDescriptionText>Wish für {descripion}</StyledDescriptionText>
					<div>
						<p>{`${donationProgress} / ${donationGoal}`}</p> {/*TODO: i guess we need to load this dynamically*/}
					</div>
				</div>
			</StyledUpcomingStreamFooter>
		</StyledUpcomingStream>
	)
}

export default UpcomingStream
