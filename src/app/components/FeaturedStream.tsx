import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { StyledFeatured } from '../../styles/common.styles'

const FeaturedStream: React.FunctionComponent = () => {
	const featuredStreamRef = useRef(null)
	const [size, setSize] = useState([0, 0])

	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight])
			if (featuredStreamRef.current?.children[0]) {
				const el: HTMLIFrameElement = featuredStreamRef.current?.children[0] // twitch injected iframe stream window
				let newWidth = window.innerWidth
				if (newWidth >= 769) {
					newWidth = window.innerWidth / 2
				}
				el.width = `${newWidth}px`
				el.height = `${newWidth * (9 / 16)}px`
			}
		}
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	}, [])

	useEffect(() => {
		new Twitch.Embed('twitch-embed', {
			width: 854,
			height: 480,
			layout: 'video',
			channel: 'heideltrautEUW',
		})
	}, [])

	return <StyledFeatured ref={featuredStreamRef} id="twitch-embed"></StyledFeatured>
}

export default FeaturedStream
