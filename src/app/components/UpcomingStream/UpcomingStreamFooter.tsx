import Link from 'next/link'
import React, { FunctionComponent, useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { styled } from '../../../styles/Theme'
import ClientLink from '../ClientLink'
import { useIsSSR } from '../isSSR'
import { UpcomingStreamProps } from './UpcomingStream'

const StyledUpcomingStreamFooter = styled.div`
	display: flex;
	justify-content: space-between;
	padding: ${(p) => p.theme.space.s}px ${(p) => p.theme.space.s}px;
	background-color: ${(p) => p.theme.color.veniPurple};
	position: relative;
`

const UpcomingStreamTwitchLink = styled.p`
	color: ${(p) => p.theme.color.white};
	display: flex;

	a {
		color: ${(p) => p.theme.color.white};
		display: block;
	}
`

const StyledDescriptionText = styled.p`
	color: ${(p) => p.theme.color.white};
	font-weight: 600;
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
`

const UpcomingStreamDescription = styled.div`
	display: flex;
	flex-direction: column;
`

const UpcomingStreamerFooterLeft = styled.div`
	display: flex;
	align-items: center;
`

const UpcomingStreamerFooterRight = styled.div`
	display: flex;
	align-items: center;
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
						<span style={{ marginRight: '4px' }}>Live auf </span>
						<a href={streamLink}>{streamerChannel}</a>
					</UpcomingStreamTwitchLink>
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
