import React, { FunctionComponent, useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { BiDonateHeart } from 'react-icons/bi'
import { StreamProjectDateWrapper } from '../../../styles/common.styles'
import { styled } from '../../../styles/Theme'
import { useIsSSR } from '../../hooks/useIsSSR'
import ClientLink from '../ClientLink'
import { formatDate, formatMoneyWithSign } from '../../utils/formatUtils'
import { BsCalendar } from 'react-icons/bs'
import { UpcomingStreamFooter } from './UpcomingStreamFooter'
import { CmsUpcomingStreamer } from '../../cms/cms'
import { useInView } from 'react-intersection-observer'

const StreamerImageWrapper = styled.div<{ text: string }>`
	position: relative;

	&:before {
		content: '${(p) => p.text}';
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

export const UpcomingStreamDate = styled.p<{ projectDone: boolean }>`
	background-color: ${(p) => p.theme.color.charityTeal};
	color: ${(p) => p.theme.color.veniPurple};
	border-top-right-radius: 2px;
	border-top-left-radius: 2px;
	font-size: ${(p) => p.theme.fontSize.l}px;
	font-weight: 500;
	display: flex;
	align-items: center;
	padding: 4px 8px;
	display: ${(p) => (p.projectDone ? 'none' : 'block')};

	${(p) => p.theme.media.phone} {
		display: none;
	}
`

export const DonationLinkIndicator = styled.div<{ projectDone: boolean }>`
	position: absolute;
	right: 5px;
	bottom: 0;
	background-color: transparent;
	display: ${(p) => (p.projectDone ? 'none' : 'block')};
`

export const StyledUpcomingStream = styled.div`
	${(p) => p.theme.media.phone} {
		border-bottom: 1px solid ${(p) => p.theme.color.charityTeal};
	}
`

export const StyledUpcomingStreamPlaceholderImage = styled.img<{ projectDone: boolean }>`
	background-color: ${(p) => p.theme.color.willhaben};
	border: 1px solid ${(p) => p.theme.color.charityTeal};
	width: 100%;
	filter: ${(p) => (p.projectDone ? 'grayscale(1)' : '')};
`

export const DoneStreamDonation = styled.div<{ projectDone: boolean }>`
	position: absolute;
	bottom: 29px;
	padding: 4px 8px;
	background: linear-gradient(to right, ${(p) => p.theme.color.charityBlue}, ${(p) => p.theme.color.charityPink});
	color: white;
	font-weight: bold;
	font-size: 28px;
	display: ${(p) => (p.projectDone ? 'block' : 'none')};
`

export interface UpcomingStreamProps extends CmsUpcomingStreamer {
	donationGoal: string
	donationProgress: string
	projectDone: boolean
}

const UpcomingStream: FunctionComponent<UpcomingStreamProps> = (props: UpcomingStreamProps) => {
	const isSSR = useIsSSR()
	const [imageLoaded, setIsImagedLoaded] = useState(false)
	const { streamerChannel, date, imgUrl, streamerName, projectDone, donationProgress, customLink } = props
	const { ref, inView } = useInView({ triggerOnce: true })

	const onImageLoad = useCallback(() => {
		setIsImagedLoaded(true)
	}, [])

	const donateLinkHref = `/donate/${customLink || streamerChannel}/${props.wishes[0]}`

	return (
		<StyledUpcomingStream ref={ref}>
			<UpcomingStreamDate projectDone={projectDone}>
				<BsCalendar style={{ marginRight: '8px' }} />
				<span>{formatDate(new Date(date))}</span>
			</UpcomingStreamDate>
			<ClientLink href={donateLinkHref} ariaLabel={`Streamer ${streamerName} Logo`}>
				<StreamerImageWrapper text={streamerName}>
					{!imageLoaded && <Skeleton height={300} />}
					{!isSSR && (
						<StyledUpcomingStreamPlaceholderImage
							projectDone={projectDone}
							style={{ display: imageLoaded ? 'flex' : 'none' }}
							onLoad={onImageLoad}
							src={inView ? imgUrl : ''}
							alt={`Streamer ${streamerName} Logo`}
						/>
					)}
					<DoneStreamDonation projectDone={projectDone}>{formatMoneyWithSign(donationProgress)}</DoneStreamDonation>
					<StreamProjectDateWrapper>
						<p>{streamerName}</p>
					</StreamProjectDateWrapper>
					<DonationLinkIndicator projectDone={projectDone}>
						<BiDonateHeart color="#7DF8FF" size={30} />
					</DonationLinkIndicator>
				</StreamerImageWrapper>
			</ClientLink>
			<UpcomingStreamFooter donateLinkHref={donateLinkHref} {...props} />
		</StyledUpcomingStream>
	)
}

export default UpcomingStream
