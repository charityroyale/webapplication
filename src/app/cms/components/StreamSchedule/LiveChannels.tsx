'use client'
import styled from 'styled-components'
import { useLiveChannels } from '../../../hooks/useLiveChannels'
import React from 'react'
import { Text } from '../../components/Text'
import { BsFillPersonFill } from 'react-icons/bs'

export const LiveChannels = () => {
	const { liveChannelsData } = useLiveChannels()

	return (
		<LiveChannelsWrapper>
			<LiveChannelsTitle>
				<Text content="liveChannelsTitle" />
			</LiveChannelsTitle>
			<LiveChannelsGrid>
				{liveChannelsData.map((liveChannelData) => {
					const previewImageUrl = liveChannelData.thumbnail_url
						.replace('{width}', '400')
						.replace('{height}', '226')
					return (
						<LiveChannel key={liveChannelData.id}>
							<LiveChannelPreviewImageWrapper>
								<LiveChannelViewCount>
									<BsFillPersonFill /> {liveChannelData.viewer_count}
								</LiveChannelViewCount>
								<LiveBadge>LIVE</LiveBadge>
								<a
									target="_blank"
									rel="noreferrer"
									href={`https://twitch.tv/${liveChannelData.user_login}`}
								>
									<img
										alt={`${liveChannelData.user_login} streamed gerade ${liveChannelData.game_name}`}
										width="100%"
										src={`${previewImageUrl}`}
									/>
								</a>
							</LiveChannelPreviewImageWrapper>

							<LiveDescription>
								<LiveDescriptionTitle>{liveChannelData.title}</LiveDescriptionTitle>
								<LiveDescriptionTitle>{liveChannelData.game_name}</LiveDescriptionTitle>
								<LiveTwitchLink
									target="_blank"
									rel="noreferrer"
									href={`https://twitch.tv/${liveChannelData.user_login}`}
								>
									{liveChannelData.user_name}{' '}
								</LiveTwitchLink>
							</LiveDescription>
						</LiveChannel>
					)
				})}
			</LiveChannelsGrid>
		</LiveChannelsWrapper>
	)
}

const LiveTwitchLink = styled.a`
	margin-top: 4px;
`

const LiveDescriptionTitle = styled.div`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-size: 14px;
`

const LiveDescription = styled.div`
	padding: 0 8px 4px 6px;
	display: flex;
	flex-direction: column;
	gap: 2px;
	a {
		text-decoration: none;
	}
`

const LiveBadge = styled.div`
	position: absolute;
	top: 4px;
	right: 8px;
	background-color: red;
	padding: 0 4px;
	font-size: 14px;
`

const LiveChannelPreviewImageWrapper = styled.div`
	position: relative;
`

const LiveChannelViewCount = styled.div`
	display: flex;
	align-items: center;
	gap: 2px;
	position: absolute;
	background-color: #23156578;
	left: 8px;
	top: 4px;
	padding: 0 4px;
`

const LiveChannel = styled.div`
	background-color: #00000036;
	display: flex;
	flex-direction: column;
	max-width: 400px;
	gap: 2px;
`

const LiveChannelsWrapper = styled.div`
	margin: auto;
	color: white;
	grid-area: livechannels;
	margin: 32px 32px;
`

const LiveChannelsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	row-gap: 28px;
	column-gap: 28px;
	margin: auto;
	max-width: 700px;

	${(p) => p.theme.media.phone} {
		max-width: none;
	}
`

const LiveChannelsTitle = styled.h2`
	font-size: 54px;
	text-align: center;
	margin-bottom: 32px;

	${(p) => p.theme.media.tablet} {
		font-size: 38px;
	}

	${(p) => p.theme.media.phone} {
		font-size: 24px;
	}
`
