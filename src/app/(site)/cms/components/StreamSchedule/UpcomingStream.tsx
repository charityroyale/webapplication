import React, { FunctionComponent, useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useInView } from 'react-intersection-observer'
import { StreamProjectDateWrapper } from '../../../../../styles/common.styles'
import { formatMoneyWithSign } from '../../../utils/formatUtils'
import { CmsUpcomingStreamer } from '../../cms'
import ClientLink from '../ClientLink'
import { UpcomingStreamFooter } from './UpcomingStreamFooter'
import { styled } from 'styled-components'

const StreamerImageWrapper = styled.div`
	position: relative;

	&:before {
		content: ' ';
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

export const UpcomingStreamDate = styled.p<{ $projectdone: boolean }>`
	background-color: ${(p) => p.theme.color.charityTeal};
	color: ${(p) => p.theme.color.veniPurple};
	border-top-right-radius: 2px;
	border-top-left-radius: 2px;
	font-size: ${(p) => p.theme.fontSize.l}px;
	font-weight: 500;
	display: flex;
	align-items: center;
	padding: 4px 8px;
	display: ${(p) => (p.$projectdone ? 'none' : 'block')};

	${(p) => p.theme.media.phone} {
		display: none;
	}
`

export const StyledUpcomingStream = styled.div`
	${(p) => p.theme.media.phone} {
		border-bottom: 1px solid ${(p) => p.theme.color.charityTeal};
	}
`

export const StyledUpcomingStreamPlaceholderImage = styled.img<{ $projectdone: boolean }>`
	background-color: ${(p) => p.theme.color.willhaben};
	border: 1px solid ${(p) => p.theme.color.charityTeal};
	width: 100%;
	filter: ${(p) => (p.$projectdone ? 'grayscale(1)' : '')};
`

export const DoneStreamDonation = styled.div<{ $projectdone: boolean }>`
	position: absolute;
	bottom: 29px;
	padding: 4px 8px;
	background: linear-gradient(to right, ${(p) => p.theme.color.charityBlue}, ${(p) => p.theme.color.charityPink});
	color: white;
	font-weight: bold;
	font-size: 28px;
	z-index: 999;
	display: ${(p) => (p.$projectdone ? 'block' : 'none')};
`

export interface UpcomingStreamProps extends CmsUpcomingStreamer {
	donationProgress: string
	$projectdone: boolean
}

const UpcomingStream: FunctionComponent<UpcomingStreamProps> = (props: UpcomingStreamProps) => {
	const [imageLoaded, setIsImagedLoaded] = useState(false)
	const [isImageErrorLoad, setIsImageErrorLoad] = useState(false)
	const { streamerChannel, imgUrl, streamerName, $projectdone, donationProgress, customLink } = props
	const { ref, inView } = useInView({ triggerOnce: true })

	const onImageLoad = useCallback(() => {
		setIsImagedLoaded(true)
	}, [])

	const onImageErrorLoad = useCallback(() => {
		setIsImageErrorLoad(true)
	}, [])

	const donateLinkHref = `/${customLink || streamerChannel}/${props.wishes[0]}`

	return (
		<StyledUpcomingStream ref={ref}>
			<ClientLink href={donateLinkHref} ariaLabel={`Streamer ${streamerName} Logo`}>
				<StreamerImageWrapper>
					{(!imageLoaded || isImageErrorLoad) && <Skeleton height={300} />}
					{inView && (
						<StyledUpcomingStreamPlaceholderImage
							$projectdone={$projectdone}
							style={{ display: imageLoaded ? '' : 'none' }}
							onLoad={onImageLoad}
							onError={onImageErrorLoad}
							src={inView ? imgUrl : ''}
							alt={`Streamer ${streamerName} Logo`}
						/>
					)}
					<DoneStreamDonation $projectdone={$projectdone}>
						{formatMoneyWithSign(donationProgress)}
					</DoneStreamDonation>
					<StreamProjectDateWrapper>
						<p>{streamerName}</p>
					</StreamProjectDateWrapper>
				</StreamerImageWrapper>
			</ClientLink>
			<UpcomingStreamFooter donateLinkHref={donateLinkHref} {...props} />
		</StyledUpcomingStream>
	)
}

export default UpcomingStream
