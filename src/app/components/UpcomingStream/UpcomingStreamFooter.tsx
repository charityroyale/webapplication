import Link from 'next/link'
import React, { FunctionComponent, useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { styled } from '../../../styles/Theme'
import ClientLink from '../ClientLink'
import { useIsSSR } from '../../hooks/useIsSSR'
import { UpcomingStreamProps } from './UpcomingStream'
import { RiTwitchFill } from 'react-icons/ri'
import { formatDate } from '../../utils/formatUtils'
import { BsCalendar } from 'react-icons/bs'
import { useInView } from 'react-intersection-observer'
import { HiOutlineHeart } from 'react-icons/hi'
import { Text } from '../Text'

const StyledUpcomingStreamFooter = styled.div`
	display: flex;
	justify-content: space-between;
	padding: ${(p) => p.theme.space.s}px ${(p) => p.theme.space.s}px;
	position: relative;
`

const UpcomingStreamTwitchLink = styled.div`
	color: ${(p) => p.theme.color.white};
	display: flex;
	margin-bottom: 4px;

	${(p) => p.theme.media.phone} {
		margin-bottom: 6px;
	}
`

const UpcomingStreamDateMobile = styled.div`
	color: ${(p) => p.theme.color.white};
	display: none;

	${(p) => p.theme.media.phone} {
		margin-top: '4px';
		display: flex;
	}
`

const HeartWrapper = styled.span`
	margin-right: 4px;
	display: flex;
`

const StyledDescriptionText = styled.p`
	color: ${(p) => p.theme.color.white};
	margin-bottom: ${(p) => p.theme.space.xs}px;
	font-weight: 600;
	display: flex;
	align-items: center;
`

const StreamerIconWrapper = styled.div`
	padding: ${(p) => p.theme.space.s}px;
	position: relative;
	border-radius: 100%;
	background-color: ${(p) => p.theme.color.decentBeton};
	height: 50px;
	width: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: ${(p) => p.theme.space.s}px;
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

const DescriptionTextMobile = styled.span`
	display: none;
	${(p) => p.theme.media.phone} {
		display: inline-block;
	}
`

const DescriptionTextTabletDesktop = styled.span`
	display: inline-block;
	${(p) => p.theme.media.phone} {
		display: none;
	}
`

export const UpcomingStreamFooter: FunctionComponent<UpcomingStreamProps> = ({
	streamerName,
	streamLink,
	streamerChannel,
	makeAWish,
	imgUrl,
	customLink,
	date,
}: UpcomingStreamProps) => {
	const [iconLoaded, setIconLoaded] = useState(false)
	const isSSR = useIsSSR()
	const { ref, inView } = useInView({ triggerOnce: true })
	const donateLinkHref = `/donate/${customLink || streamerChannel}`

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
					<StyledDescriptionText>
						<HeartWrapper>
							<HiOutlineHeart size={20} />
						</HeartWrapper>
						<span>
							<DescriptionTextMobile>
								<Text content="wishTitle" />
							</DescriptionTextMobile>
							<DescriptionTextTabletDesktop>
								<Text content="wishByHeartTitle" />
							</DescriptionTextTabletDesktop>
							<Link href={donateLinkHref}>
								<a href={donateLinkHref}>{makeAWish.childname}</a>
							</Link>
						</span>
					</StyledDescriptionText>
					<UpcomingStreamTwitchLink>
						<RiTwitchFill size={20} style={{ marginRight: '4px' }} />
						<a href={streamLink} target="_blank" rel="noreferrer">
							<span>{streamerChannel}</span>
						</a>
					</UpcomingStreamTwitchLink>

					<UpcomingStreamDateMobile>
						<BsCalendar style={{ marginLeft: '1px', marginRight: '8px' }} />
						<span>{formatDate(new Date(date))}</span>
					</UpcomingStreamDateMobile>
				</UpcomingStreamDescription>
			</UpcomingStreamerFooterLeft>
			<UpcomingStreamerFooterRight>
				<Link href={donateLinkHref}>
					<UpcomingStreamerDonationLink href={donateLinkHref}>
						<Text content="donateText" />
					</UpcomingStreamerDonationLink>
				</Link>
			</UpcomingStreamerFooterRight>
		</StyledUpcomingStreamFooter>
	)
}
