import { styled } from './Theme'

export const Heading = styled.h1`
	color: ${(p) => p.theme.color.secondary};

	${(p) => p.theme.media.phone} {
		font-size: ${(p) => p.theme.fontSize.s}px;
	}
`

export const StyledWebsiteInProgress = styled.div`
	background-color: ${(p) => p.theme.color.willhaben};
	width: 100%;
	flex-direction: column;
	color: ${(p) => p.theme.color.decentBeton};
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const StyledLayout = styled.div`
	display: grid;
	grid-template-rows: auto auto auto;
	grid-template-areas:
		'header'
		'main'
		'footer';
`

export const StyledHeaderLeftItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`
export const StyledHeaderCenterItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`
export const StyledHeaderRightItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	${(p) => p.theme.media.phone} {
		width: 100%;
		margin-top: ${(p) => p.theme.space.xl}px;
	}

	${(p) => p.theme.media.tablet} {
		margin-top: ${(p) => p.theme.space.xl}px;
		justify-content: center;
	}
`

export const StyledHeader = styled.header`
	display: grid;
	grid-area: header;
	justify-content: center;
	display: grid;
	grid-gap: ${(p) => p.theme.gridGrap.desktop}px;
	padding: 36px 24px 46px 24px;
	grid-template-areas: 'header-row header-row header-row';
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
`

export const StyledFeatured = styled.div`
	position: relative;
	grid-area: featured;
	display: flex;
	justify-content: center;
	align-items: center;

	iframe {
		border: 2px solid ${(p) => p.theme.color.charityTeal};
		box-sizing: content-box;
		background-color: black;
		border: 10px solid;
		border-width: 3px;
		border-image-slice: 1;
		border-image-source: linear-gradient(
			to right,
			${(p) => p.theme.color.charityTeal},
			${(p) => p.theme.color.charityBlue},
			${(p) => p.theme.color.charityPink}
		);

		${(p) => p.theme.media.phone} {
			border: none;
			border-top: 2px solid ${(p) => p.theme.color.charityTeal};
			border-bottom: 2px solid ${(p) => p.theme.color.charityTeal};
		}
	}
`

export const StreamProjectDateWrapper = styled.div`
	position: absolute;
	left: 0;
	background-color: ${(p) => p.theme.color.charityTeal};
	color: ${(p) => p.theme.color.veniPurple};
	bottom: 0;
	border-top-right-radius: ${(p) => p.theme.space.xs}px;
	font-weight: bold;
	font-size: ${(p) => p.theme.fontSize.xl}px;
	padding: 0px 8px;
`

export const StyledUpcoming = styled.div`
	padding: 0 ${(p) => p.theme.space.xl}px ${(p) => p.theme.space.xxl}px ${(p) => p.theme.space.xl}px;
	grid-area: upcoming;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: ${(p) => p.theme.gridGrap.desktop}px;
	margin: auto;

	${(p) => p.theme.media.tablet} {
		padding: ${(p) => p.theme.space.xl}px ${(p) => p.theme.space.xl}px;
		grid-template-columns: 1fr 1fr;
		grid-gap: ${(p) => p.theme.gridGrap.tablet}px;
	}

	${(p) => p.theme.media.phone} {
		padding: 0;
		grid-template-columns: 1fr;
		grid-gap: 0;
		margin: 0;
	}
`

export const StyledPast = styled.div`
	padding: 0 ${(p) => p.theme.space.xl}px ${(p) => p.theme.space.xxl}px ${(p) => p.theme.space.xl}px;
	grid-area: past;
	justify-content: center;
	display: grid;
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
	grid-gap: ${(p) => p.theme.gridGrap.desktop}px;

	${(p) => p.theme.media.tablet} {
		padding: ${(p) => p.theme.space.xl}px ${(p) => p.theme.space.xl}px;
		grid-template-columns: 1fr 1fr;
		grid-gap: ${(p) => p.theme.gridGrap.tablet}px;
	}

	${(p) => p.theme.media.phone} {
		padding: 0;
		grid-template-columns: 1fr;
		grid-gap: 0;
	}
`

export const StyledStreamerProjectHeader = styled.div`
	color: ${(p) => p.theme.color.white};
	padding: ${(p) => p.theme.space.m}px ${(p) => p.theme.space.s}px;
	font-weight: 600;
	font-size: ${(p) => p.theme.fontSize.xl}px;
	text-align: center;
`

export const StyleUpcomingStreamsHeader = styled.div`
	color: ${(p) => p.theme.color.white};
	grid-area: featured-header;
	margin: 64px 0;
	text-align: center;

	${(p) => p.theme.media.phone} {
		margin: 42px 0;
	}
`

export const StylePastStreamsHeader = styled.div`
	color: ${(p) => p.theme.color.white};
	grid-area: past-header;
	margin: 64px 0;
	text-align: center;

	${(p) => p.theme.media.phone} {
		margin: 42px 0;
	}
`

export const StyledKalenderDownloadLink = styled.a`
	color: ${(p) => p.theme.color.white};
	font-weight: 300;
`

export const StyleUpcomingStreamsTitle = styled.h2`
	font-size: 54px;
	margin-bottom: 4px;

	${(p) => p.theme.media.tablet} {
		font-size: 38px;
	}

	${(p) => p.theme.media.phone} {
		font-size: 24px;
	}
`

export const StyledDonationSumWidget = styled.div`
	grid-area: donation-widget-top-donation-sum;
`

export const StyledDonatorsWidget = styled.div`
	grid-area: donation-widget-top-donators;
`

export const StyledLatestDonatorssWidget = styled.div`
	grid-area: donation-widget-top-latest-donators;
`
