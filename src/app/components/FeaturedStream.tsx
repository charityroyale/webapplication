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
			if (featuredStreamRef.current?.children[0]) {
				const el: HTMLIFrameElement = featuredStreamRef.current?.children[0] // twitch injected iframe stream window
				const { width } = { ...getFeaturedStreamSize() }
				el.width = `${width}px`
				el.height = `${width * (9 / 16)}px`
			}
		}
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	}, [])

	return <StyledFeatured ref={featuredStreamRef} id="twitch-embed"></StyledFeatured>
}

export default FeaturedStream
