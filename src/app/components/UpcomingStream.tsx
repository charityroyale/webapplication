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
import ClientLink from './ClientLink'

export interface UpcomingStreamProps {
	streamerName: string
	streamerChannel: string
	streamLink: string
	makeAWishProjectId: string
	descripion: string
	imgUrl: string
	donationGoal: string
	donationProgress: string
	date: Date
}

const UpcomingStreamIcon = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 50%;
`

const UpcomingStream: FunctionComponent<UpcomingStreamProps> = ({
	streamerName,
	streamLink,
	streamerChannel,
	descripion,
	imgUrl,
	date,
	donationGoal,
	donationProgress,
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

	const donateLinkHref = `/donate/${streamerChannel}`

	return (
		<StyledUpcomingStream>
			<StyledStreamerProjectHeader>{streamerName}</StyledStreamerProjectHeader>
			<ClientLink href={donateLinkHref}>
				{!imageLoaded && <Skeleton height={275} />}
				{!isSSR && (
					<StyledUpcomingStreamPlaceholderImage
						style={{ display: imageLoaded ? 'flex' : 'none' }}
						onLoad={onImageLoad}
						src={imgUrl}
						alt="Logo für StreamProjekt"
					/>
				)}
			</ClientLink>

			<StyledUpcomingStreamFooter>
				<StreamerIconWrapper>
					<ClientLink href={streamLink} target="_blank">
						{!iconLoaded && <Skeleton circle={true} height={50} width={50} />}
						{!isSSR && (
							<UpcomingStreamIcon
								onLoad={onIconImageLoad}
								style={{ display: !iconLoaded ? 'none' : 'flex' }}
								src={imgUrl}
								alt="Logo des Streamers"
							/>
						)}
					</ClientLink>
				</StreamerIconWrapper>

				<StreamProjectDateWrapper>
					<p>{formatDate(date)}</p>
				</StreamProjectDateWrapper>
				<div>
					<StyledDescriptionText>Wish für {descripion}</StyledDescriptionText>
					<div>
						<p>{`€${donationProgress} / €${donationGoal}`}</p> {/*TODO: i guess we need to load this dynamically*/}
					</div>
				</div>
			</StyledUpcomingStreamFooter>
		</StyledUpcomingStream>
	)
}

export default UpcomingStream
