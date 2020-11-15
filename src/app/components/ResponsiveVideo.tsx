import React, { FunctionComponent } from 'react'
import { styled } from '../../styles/Theme'

const VideoContainerWrapper = styled.div`
	max-width: 100%;
`

const VideoContainer = styled.div`
	position: relative;
	padding-bottom: 56.25%;
	padding-top: 0;
	height: 0;
	overflow: hidden;

	iframe,
	embed,
	object {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 2px solid ${(p) => p.theme.color.royaleGold};
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
	return (
		<VideoContainerWrapper style={{ width }}>
			<VideoContainer>
				<iframe title={title} src={url} width={width} height={height} frameBorder="0" allowFullScreen></iframe>
			</VideoContainer>
		</VideoContainerWrapper>
	)
}
