import React, { useEffect, useRef, useState } from 'react'
import { StyledFeatured, StyledFeaturedPlaceholder } from '../../styles/common.styles'
import useIsomorphicLayoutEffect from '../hooks/useIsophormicLayoutEffect'
import { getFeaturedStreamSize } from '../utils/commonUtils'

export interface FeaturedStreamProps {
	channel: string
}

const FeaturedStream: React.FunctionComponent<FeaturedStreamProps> = ({ channel }: FeaturedStreamProps) => {
	const featuredStreamRef = useRef(null)
	const featuredStreamPlaceholderRef = useRef(null)
	const [featuredStreamLoaded, setFeaturedStreamLoaded] = useState(false)

	useEffect(() => {
		const { width, height } = { ...getFeaturedStreamSize() }
		const featuredStreamPlaceholder = featuredStreamPlaceholderRef.current
		if (featuredStreamPlaceholder) {
			;(featuredStreamPlaceholder as HTMLDivElement).style.width = `${width}px`
			;(featuredStreamPlaceholder as HTMLDivElement).style.height = `${width * (9 / 16)}px`
		}
		new Twitch.Embed('twitch-embed', {
			width: width,
			height: height,
			layout: 'video',
			channel,
		})
		const featuredStreamIFrame = featuredStreamRef.current?.querySelector('iframe')
		if (featuredStreamIFrame) {
			featuredStreamIFrame.onload = function () {
				setFeaturedStreamLoaded(true)
			}
		}
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
			<StyledFeatured ref={featuredStreamRef} id="twitch-embed">
				{!featuredStreamLoaded && (
					<StyledFeaturedPlaceholder ref={featuredStreamPlaceholderRef}>Lade Stream ... </StyledFeaturedPlaceholder>
				)}
			</StyledFeatured>
		</>
	)
}

export default FeaturedStream
