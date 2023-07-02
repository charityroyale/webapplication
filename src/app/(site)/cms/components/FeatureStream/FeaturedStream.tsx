'use client'
import React from 'react'
import FeaturedTwitchStream from './FeaturedTwitchStream'
import FeaturedYoutubeVideo from './FeaturedYoutubeURL'

interface FeaturedStreamProps {
	youtubeUrl?: string
	twitchChannelName: string
}

const FeaturedStream: React.FunctionComponent<FeaturedStreamProps> = ({
	youtubeUrl,
	twitchChannelName,
}: FeaturedStreamProps) => {
	return youtubeUrl ? (
		<FeaturedYoutubeVideo youtubeURL={youtubeUrl} />
	) : (
		<FeaturedTwitchStream channel={twitchChannelName} />
	)
}

export default FeaturedStream
