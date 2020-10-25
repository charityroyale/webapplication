import React, { useEffect } from 'react'
import { StyledFeatured } from '../../styles/common.styles'

const FeaturedStream: React.FunctionComponent = () => {
	useEffect(() => {
		new Twitch.Embed('twitch-embed', {
			width: 854,
			height: 480,
			layout: 'video',
			channel: 'heideltrautEUW',
		})
	}, [])

	return <StyledFeatured id="twitch-embed"></StyledFeatured>
}

export default FeaturedStream
