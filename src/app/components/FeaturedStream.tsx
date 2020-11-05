import React, { useEffect, useRef } from 'react'
import { StyledFeatured } from '../../styles/common.styles'
import useIsomorphicLayoutEffect from '../hooks/useIsophormicLayoutEffect'
import { getFeaturedStreamSize } from '../utils/commonUtils'

export interface FeaturedStreamProps {
	channel: string
}

const FeaturedStream: React.FunctionComponent<FeaturedStreamProps> = ({ channel }: FeaturedStreamProps) => {
	const featuredStreamRef = useRef(null)

	useEffect(() => {
		const { width, height } = { ...getFeaturedStreamSize() }
		new Twitch.Embed('twitch-embed', {
			width: width,
			height: height,
			layout: 'video',
			channel,
		})
	}, [])

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
			<StyledFeatured ref={featuredStreamRef} id="twitch-embed" />
		</>
	)
}

export default FeaturedStream
