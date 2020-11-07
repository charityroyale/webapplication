import React, { FunctionComponent, useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import {
	StyledUpcomingStream,
	StyledUpcomingStreamPlaceholderImage,
	StyledUpcomingStreamFooter,
	StreamerIconWrapper,
	StyledDescriptionText,
	StreamProjectDateWrapper,
	StyledStreamerProjectHeader,
} from '../../styles/common.styles'
import { styled } from '../../styles/Theme'
import { formatDate } from '../utils/formatUtils'
import { useIsSSR } from './isSSR'

export interface UpcomingStreamProps {
	streamerName: string
	streamLink: string
	descripion: string
	imgUrl: string
	donationGoal: number
	donationProgress: number
	date: Date
	is_live?: boolean
}

const UpcomingStreamIcon = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 50%;
`

const StyleOnlineBadge = styled.span`
	width: 11px;
	height: 11px;
	background-color: ${(p) => p.theme.color.emerald};
	position: absolute;
	top: 2px;
	right: 2px;
	border-radius: 50%;
`

const UpcomingStream: FunctionComponent<UpcomingStreamProps> = ({
	streamerName,
	streamLink,
	descripion,
	imgUrl,
	date,
	donationGoal,
	donationProgress,
	is_live,
}: UpcomingStreamProps) => {
	const isSSR = useIsSSR()
	const [imageLoaded, setIsImagedLoaded] = useState(false)
	const [iconLoaded, setIconLoaded] = useState(false)

	const onImageLoad = useCallback(() => {
		setIsImagedLoaded(true)
	}, [])

	const onIconImageLoad = useCallback(() => {
		setIconLoaded(true)
	}, [])

	return (
		<StyledUpcomingStream>
			<StyledStreamerProjectHeader>{streamerName}</StyledStreamerProjectHeader>
			{!imageLoaded && <Skeleton height={275} />}

			{!isSSR && (
				<a style={{ display: !imageLoaded ? 'none' : 'flex' }} href={streamLink} target="_blank" rel="noreferrer">
					<StyledUpcomingStreamPlaceholderImage onLoad={onImageLoad} src={imgUrl} alt="Logo für StreamProjekt" />
				</a>
			)}
			<StyledUpcomingStreamFooter>
				<StreamerIconWrapper>
					{!iconLoaded && <Skeleton circle={true} height={50} width={50} />}
					{!isSSR && (
						<a href={streamLink} target="_blank" rel="noreferrer">
							<UpcomingStreamIcon
								onLoad={onIconImageLoad}
								style={{ display: !iconLoaded ? 'none' : 'flex' }}
								src={imgUrl}
								alt="Logo des Streamers"
							/>
						</a>
					)}
					<StyleOnlineBadge style={{ backgroundColor: !is_live ? '#F16373' : '#50C878' }} />
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
