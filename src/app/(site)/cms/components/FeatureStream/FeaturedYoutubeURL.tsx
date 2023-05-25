import React from 'react'
import { ResponsiveVideo } from '../ResponsiveVideo'
import styled from 'styled-components'

interface FeaturedYoutubeVideoProps {
	youtubeURL: string
}

const FeaturedYoutubeGrid = styled.div`
	display: grid;
	grid-area: featured;
	justify-content: center;
	display: grid;
	grid-gap: 28px;
	padding: 36px 24px;
	grid-template-areas: 'featured-video featured-video featured-video';
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);

	& > div {
		grid-area: featured-video;
	}

	${(p) => p.theme.media.phone} {
		padding: 0;

		.iframe-placeholder,
		iframe,
		embed,
		object {
			border-left: none;
			border-right: none;
		}
	}
`

const FeaturedYoutubeVideo: React.FunctionComponent<FeaturedYoutubeVideoProps> = ({
	youtubeURL,
}: FeaturedYoutubeVideoProps) => {
	return (
		<FeaturedYoutubeGrid>
			<ResponsiveVideo height={'600px'} title={'Featured Youtube Video'} url={youtubeURL} />
		</FeaturedYoutubeGrid>
	)
}

export default FeaturedYoutubeVideo
