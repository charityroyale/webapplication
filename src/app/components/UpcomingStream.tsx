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
import ClientLink from './ClientLink'
import { formatDate } from '../utils/formatUtils'
import { BsCalendar } from 'react-icons/bs'

const StreamerImageWrapper = styled.div`
	position: relative;
`

const UpcomingStreamDescription = styled.div`
	display: flex;
	flex-direction: column;
`

const UpcomingStreamDate = styled.p`
	background-color: ${(p) => p.theme.color.royaleGold};
	color: ${(p) => p.theme.color.veniPurple};
	border-top-right-radius: 2px;
	border-top-left-radius: 2px;
	font-size: ${(p) => p.theme.fontSize.l}px;
	font-weight: 500;
	display: flex;
	align-items: center;
	padding: 4px 8px;
`

export interface UpcomingStreamProps {
	date: string
	streamerName: string
	streamerChannel: string
	streamLink: string
	makeAWishProjectId: string
	descripion: string
	imgUrl: string
	donationGoal: string
	donationProgress: string
}

const UpcomingStreamIcon = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 50%;
`

const UpcomingStream: FunctionComponent<UpcomingStreamProps> = ({
	date,
	streamerName,
	streamLink,
	streamerChannel,
	descripion,
	imgUrl,
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
			<UpcomingStreamDate>
				<BsCalendar style={{ marginRight: '8px' }} />
				<span>{formatDate(new Date(date))}</span>
			</UpcomingStreamDate>
			<ClientLink href={donateLinkHref}>
				<StreamerImageWrapper>
					{!imageLoaded && <Skeleton height={275} />}
					{!isSSR && (
						<StyledUpcomingStreamPlaceholderImage
							style={{ display: imageLoaded ? 'flex' : 'none' }}
							onLoad={onImageLoad}
							src={imgUrl}
							alt="Logo für StreamProjekt"
						/>
					)}
					<StreamProjectDateWrapper>
						<p>{streamerName}</p>
					</StreamProjectDateWrapper>
				</StreamerImageWrapper>
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
				<UpcomingStreamDescription>
					<StyledDescriptionText>Wish für {descripion}</StyledDescriptionText>
					<StyledUpcomingStreamDonationStatus>
						{`€${donationProgress} / €${donationGoal}`}
					</StyledUpcomingStreamDonationStatus>
					{/*TODO: i guess we need to load this dynamically*/}
				</UpcomingStreamDescription>
			</StyledUpcomingStreamFooter>
		</StyledUpcomingStream>
	)
}

export default UpcomingStream
