'use client'
import styled from 'styled-components'
import { useLiveChannels } from '../../../hooks/useLiveChannels'
import React from 'react'
import { Text } from '../../components/Text'
import { BsFillPersonFill } from 'react-icons/bs'

export const LiveChannels = () => {
	const { liveChannelsData } = useLiveChannels()
	console.log(liveChannelsData)

	return (
		<LiveChannelsWrapper>
			<LiveChannelsTitle>
				<Text content="liveChannelsTitle" />
			</LiveChannelsTitle>
			<LiveChannelsGrid>
				{liveChannelsData.map((liveChannelData) => {
					const previewImageUrl = liveChannelData.thumbnail_url
						.replace('{width}', '200')
						.replace('{height}', '113')
					return (
						<LiveChannel key={liveChannelData.id}>
							<img src={`${previewImageUrl}`} />
							{liveChannelData.user_name}{' '}
							<div>
								<BsFillPersonFill /> {liveChannelData.viewer_count}
							</div>
							<div>
								<a
									href={`twitch.tv/${liveChannelData.user_login}`}
								>{`twitch.tv/${liveChannelData.user_login}`}</a>
							</div>
						</LiveChannel>
					)
				})}
			</LiveChannelsGrid>
		</LiveChannelsWrapper>
	)
}

const LiveChannel = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 400px;
	gap: 8px;
`

const LiveChannelsWrapper = styled.div`
	margin: auto;
	color: white;
	margin: 32px 32px;
`

const LiveChannelsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	row-gap: 28px;
	column-gap: 28px;
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
