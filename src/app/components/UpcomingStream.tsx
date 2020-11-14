import React, { FunctionComponent, useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import {
	StyledUpcomingStream,
	StyledUpcomingStreamPlaceholderImage,
	StyledUpcomingStreamFooter,
	StreamerIconWrapper,
	StyledDescriptionText,
	StreamProjectDateWrapper,
	StyledUpcomingStreamDonationStatus,
} from '../../styles/common.styles'
import { styled } from '../../styles/Theme'
import { useIsSSR } from './isSSR'
import SSRClientSideLink from './SSRLink'

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

	return (
		<StyledUpcomingStream>
			{!imageLoaded && <Skeleton height={275} />}

			<SSRClientSideLink href={`/donate/${streamerChannel}`}>
				{!isSSR && (
					<StyledUpcomingStreamPlaceholderImage
						style={{ display: imageLoaded ? 'flex' : 'none' }}
						onLoad={onImageLoad}
						src={imgUrl}
						alt="Logo für StreamProjekt"
					/>
				)}
			</SSRClientSideLink>

			<StyledUpcomingStreamFooter>
				<StreamerIconWrapper>
					{!iconLoaded && <Skeleton circle={true} height={50} width={50} />}
					<SSRClientSideLink href={streamLink} target="_blank">
						{!isSSR && (
							<UpcomingStreamIcon
								onLoad={onIconImageLoad}
								style={{ display: !iconLoaded ? 'none' : 'flex' }}
								src={imgUrl}
								alt="Logo des Streamers"
							/>
						)}
					</SSRClientSideLink>
				</StreamerIconWrapper>

				<StreamProjectDateWrapper>
					<p>{streamerName}</p>
				</StreamProjectDateWrapper>
				<div>
					<StyledDescriptionText>Wish für {descripion}</StyledDescriptionText>
					<StyledUpcomingStreamDonationStatus>{`€${donationProgress} / €${donationGoal}`}</StyledUpcomingStreamDonationStatus>
					{/*TODO: i guess we need to load this dynamically*/}
				</div>
			</StyledUpcomingStreamFooter>
		</StyledUpcomingStream>
	)
}

export default UpcomingStream
