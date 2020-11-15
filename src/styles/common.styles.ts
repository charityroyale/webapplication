import { styled } from './Theme'

export const Heading = styled.h1`
	color: ${(p) => p.theme.color.secondary};

	${(p) => p.theme.media.phone} {
		font-size: ${(p) => p.theme.fontSize.s}px;
	}
`

export const DonateButton = styled.button`
	padding: 24px 48px;
	background-color: ${(p) => p.theme.color.veniPurple};
	border: 2px solid ${(p) => p.theme.color.royaleGold};
	color: ${(p) => p.theme.color.white};
	font-size: ${(p) => p.theme.fontSize.l}px;
	letter-spacing: 3px;
	font-family: inherit;
	display: inline-block;
	font-weight: 600;
	margin: 10px 0 10px 10px;

	${(p) => p.theme.media.phone} {
		margin: 0;
	}

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
	align-items: center;
	justify-content: flex-start;
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
		margin-top: ${(p) => p.theme.space.xl}px;
		justify-content: center;
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
	padding: 36px 24px;
	grid-template-areas: 'header-row header-row header-row';
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
	background-color: ${(p) => p.theme.color.veniPurple};
`

export const StyledMain = styled.main`
	grid-area: main;
	display: grid;
	grid-template-rows: auto auto auto;
	grid-template-areas: 'featured' 'faq-box' 'featured-header' 'upcoming';

	padding-top: 20px; // charity royale logo
	background-color: ${(p) => p.theme.color.veniPurple};
`

export const StyledFeatured = styled.div`
	position: relative;
	grid-area: featured;
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${(p) => p.theme.color.veniPurple};

	iframe {
		border: 2px solid ${(p) => p.theme.color.royaleGold};
		box-sizing: content-box;
		background-color: black;

		${(p) => p.theme.media.phone} {
			border: none;
			border-top: 2px solid ${(p) => p.theme.color.royaleGold};
			border-bottom: 2px solid ${(p) => p.theme.color.royaleGold};
		}
	}
`

export const StyledUpcoming = styled.div`
	padding: 0 ${(p) => p.theme.space.xl}px ${(p) => p.theme.space.xxl}px ${(p) => p.theme.space.xl}px;
	grid-area: upcoming;
	justify-content: center;
	display: grid;
	grid-gap: ${(p) => p.theme.gridGrap.desktop}px;
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
	// grid-template-columns: 1fr 1fr 1fr;

	${(p) => p.theme.media.tablet} {
		padding: ${(p) => p.theme.space.xl}px ${(p) => p.theme.space.xl}px;
		grid-template-columns: 1fr 1fr;
		grid-gap: ${(p) => p.theme.gridGrap.tablet}px;
	}

	${(p) => p.theme.media.phone} {
		padding: 0;
		grid-template-columns: 1fr;
		grid-gap: ${(p) => p.theme.gridGrap.phone}px;
	}
`

export const StyledUpcomingStream = styled.div`
	// background-color: ${(p) => p.theme.color.decentBeton};
`

export const StyledUpcomingStreamPlaceholderImage = styled.img`
	border: 2px solid ${(p) => p.theme.color.royaleGold};
	background-color: ${(p) => p.theme.color.willhaben};
	width: 100%;

	${(p) => p.theme.media.phone} {
		border-left: none;
		border-right: none;
	}
`

export const StyledUpcomingStreamFooter = styled.div`
	display: flex;
	align-items: center;
	padding: ${(p) => p.theme.space.s}px ${(p) => p.theme.space.xs}px;
	background-color: ${(p) => p.theme.color.veniPurple};
	position: relative;
`

export const StyledUpcomingStreamDonationStatus = styled.p`
	color: ${(p) => p.theme.color.white};
`

export const StyledDescriptionText = styled.p`
	color: ${(p) => p.theme.color.white};
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
	color: ${(p) => p.theme.color.white};
	background-color: ${(p) => p.theme.color.veniPurple};
	padding: ${(p) => p.theme.space.m}px ${(p) => p.theme.space.s}px;
	font-weight: 600;
	font-size: ${(p) => p.theme.fontSize.xl}px;
	text-align: center;
`

export const StreamProjectDateWrapper = styled.div`
	position: absolute;
	left: 0;
	background-color: ${(p) => p.theme.color.royaleGold};
	color: ${(p) => p.theme.color.veniPurple};
	top: 0;
	border-top-right-radius: ${(p) => p.theme.space.xs}px;
	transform: translateY(-100%);
	font-weight: bold;
	font-size: ${(p) => p.theme.fontSize.xl}px;
	padding: 0px 8px;
`

export const StyleUpcomingStreamsHeader = styled.div`
	color: ${(p) => p.theme.color.white};
	grid-area: featured-header;
	margin: 64px 0;
	text-align: center;
`

export const StyledKalenderDownloadLink = styled.a`
	color: ${(p) => p.theme.color.white};
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

export const StyledDonationSumWidget = styled.div`
	grid-area: donation-widget-top-donation-sum;
	background-color: ${(p) => p.theme.color.white};
`

export const StyledDonatorsWidget = styled.div`
	grid-area: donation-widget-top-donators;
	background-color: ${(p) => p.theme.color.white};
`

export const StyledLatestDonatorssWidget = styled.div`
	grid-area: donation-widget-top-latest-donators;
	background-color: ${(p) => p.theme.color.white};
`

export const StyledDonationMainGrid = styled.div`
	display: grid;
	margin: auto;
	padding: 0 ${(p) => p.theme.space.xxl}px;
	grid-gap: ${(p) => p.theme.gridGrap.desktop}px;
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
