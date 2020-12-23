import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { StyledFeatured } from '../../styles/common.styles'
import useIsomorphicLayoutEffect from '../hooks/useIsophormicLayoutEffect'
import { getFeaturedStreamSize } from '../utils/commonUtils'
import { useIsSSR } from '../hooks/useIsSSR'

interface FeaturedTwitchStreamProps {
	channel: string
}

const FeaturedTwitchStream: React.FunctionComponent<FeaturedTwitchStreamProps> = ({
	channel,
}: FeaturedTwitchStreamProps) => {
	const isSSR = useIsSSR()
	const featuredStreamRef = useRef(null)
	const [featuredStreamLoaded, setFeaturedStreamLoaded] = useState(false)

	useEffect(() => {
		const { width, height } = { ...getFeaturedStreamSize() }
		new Twitch.Embed('twitch-embed', {
			width: width,
			height: height,
			layout: 'video',
			channel,
		})

		const ref = featuredStreamRef.current
		if (ref) {
			ref.onload = setFeaturedStreamLoaded(true)
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
			{isSSR || !featuredStreamLoaded ? (
				<StyledFeatured>
					<Skeleton height={600} />
				</StyledFeatured>
			) : null}
			<StyledFeatured ref={featuredStreamRef} id="twitch-embed" />
		</>
	)
}

export default FeaturedTwitchStream
