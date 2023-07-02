'use client'
import React, { FunctionComponent, useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { styled } from 'styled-components'

const VideoContainerWrapper = styled.div`
	max-width: 100%;
`

const VideoContainer = styled.div`
	position: relative;
	padding-bottom: 56.25%;
	padding-top: 0;
	height: 0;
	overflow: hidden;
	box-shadow: 4px 4px 3px 1px #000000;

	.iframe-placeholder,
	iframe,
	embed,
	object {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 10px solid;
		border-width: 3px;
		border-image-slice: 1;
		border-image-source: linear-gradient(
			to right,
			${(p) => p.theme.color.charityTeal},
			${(p) => p.theme.color.charityBlue},
			${(p) => p.theme.color.charityPink}
		);
	}
`

interface ResponsiveVideoProps {
	url: string
	title: string
	width?: string
	height?: string
}

export const ResponsiveVideo: FunctionComponent<ResponsiveVideoProps> = ({
	url,
	title,
	width = '100%',
	height = '100%',
}: ResponsiveVideoProps) => {
	const [isIframedLoaded, setIsIframeLoaded] = useState(false)

	const onIframeLoaded = useCallback(() => {
		setIsIframeLoaded(true)
	}, [])

	return (
		<VideoContainerWrapper style={{ width }}>
			<VideoContainer>
				{!isIframedLoaded && <Skeleton className="iframe-placeholder" height={height} width={width} />}
				<iframe
					title={title}
					src={url}
					width={width}
					height={height}
					frameBorder="0"
					onLoad={onIframeLoaded}
					allowFullScreen
				></iframe>
			</VideoContainer>
		</VideoContainerWrapper>
	)
}
