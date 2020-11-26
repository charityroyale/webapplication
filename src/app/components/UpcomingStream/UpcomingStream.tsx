import React, { FunctionComponent, useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { BiDonateHeart } from 'react-icons/bi'
import { StyledUpcomingStreamPlaceholderImage, StreamProjectDateWrapper } from '../../../styles/common.styles'
import { styled } from '../../../styles/Theme'
import { useIsSSR } from '../isSSR'
import ClientLink from '../ClientLink'
import { formatDate } from '../../utils/formatUtils'
import { BsCalendar } from 'react-icons/bs'
import { UpcomingStreamFooter } from './UpcomingStreamFooter'
import { MakeAWishProject } from '../../cms/cms'

const StreamerImageWrapper = styled.div`
	position: relative;

	&:before {
		content: 'Jetzt für das Projekt spenden';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #231565cc; // transparent hover
		display: none;
		justify-content: center;
		align-items: center;
		color: white;
		font-weight: bold;
	}

	${(p) => p.theme.media.desktop} {
		&:hover:before {
			cursor: pointer;
			display: flex;
		}
	}

	${(p) => p.theme.media.phone} {
		display: none !important;
	}
`

export const UpcomingStreamDate = styled.p`
	background-color: ${(p) => p.theme.color.charityTeal};
	color: ${(p) => p.theme.color.veniPurple};
	border-top-right-radius: 2px;
	border-top-left-radius: 2px;
	font-size: ${(p) => p.theme.fontSize.l}px;
	font-weight: 500;
	display: flex;
	align-items: center;
	padding: 4px 8px;

	${(p) => p.theme.media.phone} {
		display: none;
	}
`

export const DonationLinkIndicator = styled.div`
	position: absolute;
	right: 5px;
	bottom: 0;
	background-color: transparent;
`

export const StyledUpcomingStream = styled.div`
	${(p) => p.theme.media.phone} {
		border-bottom: 1px solid ${(p) => p.theme.color.charityTeal};
	}
`

export interface UpcomingStreamProps {
	date: string
	streamerName: string
	streamerChannel: string
	streamLink: string
	makeAWishProjectId: string
	makeAWish: MakeAWishProject
	imgUrl: string
	donationGoal: string
	donationProgress: string
}

const UpcomingStream: FunctionComponent<UpcomingStreamProps> = (props: UpcomingStreamProps) => {
	const isSSR = useIsSSR()
	const [imageLoaded, setIsImagedLoaded] = useState(false)
	const { streamerChannel, date, imgUrl, streamerName } = props

	const onImageLoad = useCallback(() => {
		setIsImagedLoaded(true)
	}, [])

	const donateLinkHref = `/donate/${streamerChannel}`

	return (
		<StyledUpcomingStream>
			<UpcomingStreamDate>
				<BsCalendar style={{ marginRight: '8px' }} />
				<span>{formatDate(new Date(date))}</span>
			</UpcomingStreamDate>
			<ClientLink href={donateLinkHref} ariaLabel={`Streamer ${streamerName} Logo`}>
				<StreamerImageWrapper>
					{!imageLoaded && <Skeleton height={300} width={300} />}
					{!isSSR && (
						<StyledUpcomingStreamPlaceholderImage
							style={{ display: imageLoaded ? 'flex' : 'none' }}
							onLoad={onImageLoad}
							src={imgUrl}
							alt={`Streamer ${streamerName} Logo`}
						/>
					)}
					<StreamProjectDateWrapper>
						<p>{streamerName}</p>
					</StreamProjectDateWrapper>
					<DonationLinkIndicator>
						<BiDonateHeart color="#7DF8FF" size={30} />
					</DonationLinkIndicator>
				</StreamerImageWrapper>
			</ClientLink>
			<UpcomingStreamFooter {...props} />
		</StyledUpcomingStream>
	)
}

export default UpcomingStream
