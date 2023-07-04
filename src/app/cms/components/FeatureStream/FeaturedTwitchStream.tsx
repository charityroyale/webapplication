'use client'
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useIsomorphicLayoutEffect } from 'swr/_internal'
import { getFeaturedStreamSize } from '../../../utils/commonUtils'
import { StyledFeatured } from '../../../../styles/common.styles'

interface FeaturedTwitchStreamProps {
	channel: string
}

const FeaturedTwitchStream: React.FunctionComponent<FeaturedTwitchStreamProps> = ({
	channel,
}: FeaturedTwitchStreamProps) => {
	const featuredStreamRef = useRef<null | HTMLIFrameElement>(null)
	const [featuredStreamLoaded, setFeaturedStreamLoaded] = useState(false)

	useEffect(() => {
		const { width, height } = { ...getFeaturedStreamSize() }
		new window.Twitch.Embed('twitch-embed', {
			width: width,
			height: height,
			layout: 'video',
			channel: channel.includes('/') ? channel.split('/')[0] : channel,
		})

		const ref = featuredStreamRef.current
		if (ref) {
			ref.onload = (_e) => setFeaturedStreamLoaded(true)
		}
	}, [channel])

	useIsomorphicLayoutEffect(() => {
		function updateSize() {
			const featuredStreamIFrame = featuredStreamRef.current?.querySelector('iframe')
			if (featuredStreamIFrame) {
				const width = getFeaturedStreamSize().width
				featuredStreamIFrame.width = `${width}px`
				featuredStreamIFrame.height = `${width * (9 / 16)}px`
			}
		}
		window.addEventListener('resize', updateSize)
		return () => window.removeEventListener('resize', updateSize)
	}, [])

	return (
		<>
			{!featuredStreamLoaded ? (
				<StyledFeatured>
					<Skeleton height={600} />
				</StyledFeatured>
			) : null}
			<StyledFeatured ref={featuredStreamRef} id="twitch-embed" />
		</>
	)
}

export default FeaturedTwitchStream
