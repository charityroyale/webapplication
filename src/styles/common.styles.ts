import { styled } from './Theme'

export const Heading = styled.h1`
	color: ${(p) => p.theme.color.secondary};

	${(p) => p.theme.media.phone} {
		font-size: ${(p) => p.theme.fontSize.s}px;
	}
`

export const DonateButton = styled.button`
	padding: 24px 48px;
	background: ${(p) => p.theme.color.willhaben};
	color: ${(p) => p.theme.color.white};
	font-size: ${(p) => p.theme.fontSize.l};
	letter-spacing: 3px;
	font-family: inherit;
	display: inline-block;
	font-weight: 600;
	width: fit-content; // check compatibility firefox

	&:hover {
		cursor: pointer;
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
	justify-content: flex-start;
`
export const StyledHeaderCenterItem = styled.div`
	display: flex;
	justify-content: center;
`
export const StyledHeaderRightItem = styled.div`
	display: flex;
	justify-content: flex-end;
`

export const StyledHeader = styled.header`
	display: grid;
	grid-area: header;
	justify-content: center;
	display: grid;
	grid-gap: 36px;
	padding: 36px 24px;
	grid-template-areas: 'header-row header-row header-row';
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
	background-color: ${(p) => p.theme.color.harvestGold};
`

export const StyledMain = styled.main`
	grid-area: main;
	display: grid;
	grid-template-rows: auto auto auto;
	grid-template-areas: 'featured' 'featured-header' 'upcoming';

	padding-top: 20px; // charity royale logo
	background-color: ${(p) => p.theme.color.harvestGold};
`

export const StyledFeatured = styled.div`
	position: relative;
	grid-area: featured;
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${(p) => p.theme.color.harvestGold};
`

export const StyledUpcoming = styled.div`
	padding: 0 ${(p) => p.theme.space.xl}px ${(p) => p.theme.space.xxl}px ${(p) => p.theme.space.xl}px;
	grid-area: upcoming;
	justify-content: center;
	display: grid;
	grid-gap: ${(p) => p.theme.space.xxl}px;
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
	// grid-template-columns: 1fr 1fr 1fr;

	${(p) => p.theme.media.tablet} {
		padding: ${(p) => p.theme.space.xl}px ${(p) => p.theme.space.xl}px;
		grid-template-columns: 1fr 1fr;
		grid-gap: ${(p) => p.theme.space.xl}px;
	}

	${(p) => p.theme.media.phone} {
		padding: 0;
		grid-template-columns: 1fr;
		grid-gap: ${(p) => p.theme.space.s}px;
	}
`

export const StyledUpcomingStream = styled.div`
	background-color: ${(p) => p.theme.color.decentBeton};
`

export const StyledUpcomingStreamPlaceholderImage = styled.img`
	width: 100%;
`

export const StyledUpcomingStreamFooter = styled.div`
	display: flex;
	align-items: center;
	padding: ${(p) => p.theme.space.s}px ${(p) => p.theme.space.xs}px;
	background-color: ${(p) => p.theme.color.harvestGold};
	position: relative;
`

export const StyledDescriptionText = styled.p`
	font-weight: 600;
`

export const StreamerIconWrapper = styled.div`
	padding: ${(p) => p.theme.space.s}px;
	position: relative;
	border-radius: 100%;
	background-color: ${(p) => p.theme.color.decentBeton};
	height: 50px;
	width: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: ${(p) => p.theme.space.s}px;
`

export const StyledStreamerProjectHeader = styled.div`
	background-color: ${(p) => p.theme.color.harvestGold};
	padding: ${(p) => p.theme.space.m}px ${(p) => p.theme.space.s}px;
	font-weight: 600;
	font-size: ${(p) => p.theme.fontSize.xl}px;
	text-align: center;
`

export const StreamProjectDateWrapper = styled.div`
	position: absolute;
	padding: ${(p) => p.theme.space.xs / 2}px ${(p) => p.theme.space.xs}px;
	left: 0;
	color: ${(p) => p.theme.color.white};
	background-color: ${(p) => p.theme.color.willhaben};
	top: 0;
	border-top-right-radius: ${(p) => p.theme.space.xs}px;
	transform: translateY(-100%);
`

export const StyleUpcomingStreamsHeader = styled.div`
	grid-area: featured-header;
	margin: 64px 0;
	text-align: center;
`

export const StyledKalenderDownloadLink = styled.a`
	color: black;
	font-weight: 300;
`

export const StyleUpcomingStreamsTitle = styled.h5`
	font-size: 54px;

	${(p) => p.theme.media.tablet} {
		font-size: 38px;
	}

	${(p) => p.theme.media.phone} {
		font-size: 24px;
	}
`

export const StyledDonationFormIframe = styled.iframe`
	width: 100%;
	height: 850px;
	border: none;
	grid-area: donation-form;
`

export const StyledDonationHeader = styled.div`
	grid-area: donation-header;
	background-color: ${(p) => p.theme.color.white};
	border-radius: ${(p) => p.theme.space.xs}px;
`

export const StyledDonationSumWidget = styled.div`
	grid-area: donation-widget-top-donation-sum;
	border-radius: ${(p) => p.theme.space.xs}px;
	background-color: ${(p) => p.theme.color.white};
`

export const StyledDonatorsWidget = styled.div`
	grid-area: donation-widget-top-donators;
	border-radius: ${(p) => p.theme.space.xs}px;
	background-color: ${(p) => p.theme.color.white};
`

export const StyledLatestDonatorssWidget = styled.div`
	grid-area: donation-widget-top-latest-donators;
	border-radius: ${(p) => p.theme.space.xs}px;
	background-color: ${(p) => p.theme.color.white};
`

export const StyledDonationMainGrid = styled.div`
	display: grid;
	margin: auto;
	padding: 0 ${(p) => p.theme.space.xxl}px;
	grid-gap: ${(p) => p.theme.space.xxl}px;
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
	grid-template-areas:
		'donation-header donation-header donation-header'
		'donation-form donation-form donation-widget-top-donation-sum'
		'donation-form donation-form donation-widget-top-donators'
		'donation-form donation-form donation-widget-top-latest-donators';

	${(p) => p.theme.media.phone} {
		width: 100%;
		grid-template-columns: 1fr;
		padding: 0 ${(p) => p.theme.space.xl}px;
		grid-template-areas:
			'donation-header'
			'donation-form'
			'donation-widget-top-donation-sum'
			'donation-widget-top-donators'
			'donation-widget-top-latest-donators';
	}

	${(p) => p.theme.media.tablet} {
		width: 100%;
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
			'donation-header donation-header'
			'donation-form donation-form'
			'donation-widget-top-donation-sum donation-widget-top-donators'
			'donation-widget-top-latest-donators donation-widget-top-latest-donators';
	}
`
