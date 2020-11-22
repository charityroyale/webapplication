import Link from 'next/link'
import React, { FunctionComponent, useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { styled } from '../../../styles/Theme'
import ClientLink from '../ClientLink'
import { useIsSSR } from '../isSSR'
import { UpcomingStreamProps } from './UpcomingStream'
import { RiTwitchFill } from 'react-icons/ri'
import { formatDate } from '../../utils/formatUtils'
import { BsCalendar } from 'react-icons/bs'

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

	a {
		color: ${(p) => p.theme.color.white};
		display: block;
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

const StyledDescriptionText = styled.p`
	color: ${(p) => p.theme.color.white};
	font-weight: 600;

	${(p) => p.theme.media.phone} {
		margin-bottom: ${(p) => p.theme.space.xs}px;
	}
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
	border: 1px solid ${(p) => p.theme.color.royaleGold};
`

const UpcomingStreamDescription = styled.div`
	display: flex;
	flex-direction: column;
`

const UpcomingStreamerFooterLeft = styled.div`
	display: flex;
	align-items: center;

	${(p) => p.theme.media.phone} {
		align-items: flex-start;
	}
`

const UpcomingStreamerFooterRight = styled.div`
	display: flex;
	align-items: center;
	display: none;

	${(p) => p.theme.media.phone} {
		display: flex;
	}
`

const UpcomingStreamerDonationLink = styled.a`
	padding: 8px 32px;
	display: none;
	text-decoration: none;
	color: ${(p) => p.theme.color.white};
	border: 2px solid ${(p) => p.theme.color.royaleGold};

	&:hover,
	&:focus {
		background-color: ${(p) => p.theme.color.royaleGold};
		color: ${(p) => p.theme.color.veniPurple};
	}

	${(p) => p.theme.media.phone} {
		display: flex;
	}
`

export const UpcomingStreamFooter: FunctionComponent<UpcomingStreamProps> = ({
	streamerName,
	streamLink,
	streamerChannel,
	descripion,
	imgUrl,
	date,
}: UpcomingStreamProps) => {
	const [iconLoaded, setIconLoaded] = useState(false)
	const isSSR = useIsSSR()

	const onIconImageLoad = useCallback(() => {
		setIconLoaded(true)
	}, [])

	return (
		<StyledUpcomingStreamFooter>
			<UpcomingStreamerFooterLeft>
				<StreamerIconWrapper>
					<ClientLink href={streamLink} target="_blank">
						{!iconLoaded && <Skeleton circle={true} height={50} width={50} />}
						{!isSSR && (
							<UpcomingStreamIcon
								onLoad={onIconImageLoad}
								style={{ display: !iconLoaded ? 'none' : 'flex' }}
								src={imgUrl}
								alt={`Streamer ${streamerName} Logo`}
							/>
						)}
					</ClientLink>
				</StreamerIconWrapper>
				<UpcomingStreamDescription>
					<StyledDescriptionText>Wish für {descripion}</StyledDescriptionText>
					<UpcomingStreamTwitchLink>
						<RiTwitchFill size={20} style={{ marginRight: '4px' }} />
						<a href={streamLink} target="_blank" rel="noreferrer">
							{`${streamerChannel}`}
						</a>
					</UpcomingStreamTwitchLink>
					<UpcomingStreamDateMobile>
						<BsCalendar style={{ marginLeft: '1px', marginRight: '8px' }} />
						<span>{formatDate(new Date(date))}</span>
					</UpcomingStreamDateMobile>
				</UpcomingStreamDescription>
			</UpcomingStreamerFooterLeft>
			<UpcomingStreamerFooterRight>
				<Link href={`donate/${streamerChannel}`}>
					<UpcomingStreamerDonationLink href={`donate/${streamerChannel}`}>SPENDEN</UpcomingStreamerDonationLink>
				</Link>
			</UpcomingStreamerFooterRight>
		</StyledUpcomingStreamFooter>
	)
}
