import Link from 'next/link'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { BsCalendar } from 'react-icons/bs'
import { RiTwitchFill } from 'react-icons/ri'
import { useInView } from 'react-intersection-observer'
import Skeleton from 'react-loading-skeleton'
import { useIsSSR } from '../../../hooks/useIsSSR'
import { formatDate } from '../../../utils/formatUtils'
import ClientLink from '../ClientLink'
import { UpcomingStreamProps } from './UpcomingStream'
import { Text } from '../../components/Text'
import { styled } from 'styled-components'

const StyledUpcomingStreamFooter = styled.div`
	display: flex;
	justify-content: space-between;
	padding: ${(p) => p.theme.space.s}px ${(p) => p.theme.space.s}px ${(p) => p.theme.space.s}px 0;
	position: relative;
`

const UpcomingStreamTwitchLink = styled.div`
	color: ${(p) => p.theme.color.white};
	display: flex;
	margin-bottom: 4px;

	${(p) => p.theme.media.phone} {
		margin-bottom: 6px;
	}

	// special treatment for very long
	// twitch channels on small devices
	@media (max-width: 400px) {
		a {
			max-width: 115px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
`

const UpcomingStreamDate = styled.div`
	color: ${(p) => p.theme.color.white};
	display: flex;
	margin-top: 6px;
`

const StreamerIconWrapper = styled.div`
	padding: ${(p) => p.theme.space.s}px;
	position: relative;
	border-radius: 100%;
	background-color: ${(p) => p.theme.color.decentBeton};
	height: 50px;
	width: 50px;
	display: none;
	justify-content: center;
	align-items: center;
	margin-right: ${(p) => p.theme.space.s}px;
	${(p) => p.theme.media.phone} {
		display: flex;
	}
`

const UpcomingStreamIcon = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 50%;
	border: 1px solid ${(p) => p.theme.color.charityTeal};
`

const UpcomingStreamDescription = styled.div`
	a {
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
`

const UpcomingStreamerFooterLeft = styled.div`
	display: flex;
	align-items: center;

	${(p) => p.theme.media.phone} {
		align-items: flex-start;
	}
`

const UpcomingStreamerFooterRight = styled.div`
	display: none;

	${(p) => p.theme.media.phone} {
		align-items: center;
		display: flex;
	}
`

export const UpcomingStreamerDonationLink = styled.a`
	padding: 8px 18px;
	display: none;
	text-decoration: none;
	color: ${(p) => p.theme.color.white};
	border: 2px solid ${(p) => p.theme.color.charityTeal};
	box-shadow: -3px 3px black;

	&:hover,
	&:focus {
		background-color: ${(p) => p.theme.color.charityTeal};
		color: ${(p) => p.theme.color.veniPurple};
	}

	${(p) => p.theme.media.phone} {
		display: flex;
	}
`

interface UpcomingStreamFooterProps extends UpcomingStreamProps {
	donateLinkHref: string
}
export const UpcomingStreamFooter: FunctionComponent<UpcomingStreamFooterProps> = ({
	streamerName,
	streamLink,
	streamerChannel,
	imgUrl,
	donateLinkHref,
	date,
}: UpcomingStreamFooterProps) => {
	const [iconLoaded, setIconLoaded] = useState(false)
	const isSSR = useIsSSR()
	const { ref, inView } = useInView({ triggerOnce: true })

	const onIconImageLoad = useCallback(() => {
		setIconLoaded(true)
	}, [])

	return (
		<StyledUpcomingStreamFooter ref={ref}>
			<UpcomingStreamerFooterLeft>
				<StreamerIconWrapper>
					<ClientLink href={streamLink} target="_blank">
						{!iconLoaded && <Skeleton circle={true} height={50} width={50} />}
						{!isSSR && (
							<UpcomingStreamIcon
								onLoad={onIconImageLoad}
								style={{ display: !iconLoaded ? 'none' : 'flex' }}
								src={inView ? imgUrl : ''}
								alt={`Streamer ${streamerName} Logo`}
							/>
						)}
					</ClientLink>
				</StreamerIconWrapper>
				<UpcomingStreamDescription>
					<UpcomingStreamTwitchLink>
						<RiTwitchFill size={20} style={{ marginRight: '4px' }} />
						<a href={streamLink} target="_blank" rel="noreferrer">
							<span>{streamerChannel}</span>
						</a>
					</UpcomingStreamTwitchLink>

					<UpcomingStreamDate>
						<BsCalendar style={{ marginLeft: '1px', marginRight: '8px' }} />
						<span>{formatDate(new Date(date))}</span>
					</UpcomingStreamDate>
				</UpcomingStreamDescription>
			</UpcomingStreamerFooterLeft>
			<UpcomingStreamerFooterRight>
				<Link href={donateLinkHref} legacyBehavior={true}>
					<UpcomingStreamerDonationLink href={donateLinkHref}>
						<Text content="donateText" />
					</UpcomingStreamerDonationLink>
				</Link>
			</UpcomingStreamerFooterRight>
		</StyledUpcomingStreamFooter>
	)
}
