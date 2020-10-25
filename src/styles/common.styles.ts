import { styled } from './Theme'

export const Heading = styled.h1`
	color: ${(p) => p.theme.color.secondary};

	${(p) => p.theme.media.phone} {
		font-size: ${(p) => p.theme.fontSize.s}px;
	}
`

export const StyledLayout = styled.div`
	display: grid;
	grid-template-rows: 75px auto 75px;
	grid-template-areas:
		'header'
		'main'
		'footer';
`

export const StyledHeader = styled.header`
	grid-area: header;
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	grid-template-areas: 'left center right';

	background-color: ${(p) => p.theme.color.harvestGold};
`

export const StyledFooter = styled.footer`
	grid-area: footer;
	display: grid;
	grid-template-columns: 6fr 1fr;
	grid-template-areas: 'left right';

	background-color: ${(p) => p.theme.color.harvestGold};
`

export const StyledMain = styled.main`
	grid-area: main;
	display: grid;
	grid-template-rows: auto auto;
	grid-template-areas: 'featured' 'upcoming';

	background-color: ${(p) => p.theme.color.willhaben};
`
export const StyledFeatured = styled.div`
	overflow: hidden;
	grid-area: featured;
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${(p) => p.theme.color.decentBeton};
`

export const StyledUpcoming = styled.div`
	padding: ${(p) => p.theme.space.m}px ${(p) => p.theme.space.xl}px;
	grid-area: upcoming;
	justify-content: center;
	display: grid;
	grid-gap: ${(p) => p.theme.space.m}px;
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);

	${(p) => p.theme.media.tablet} {
		padding: ${(p) => p.theme.space.s}px ${(p) => p.theme.space.m}px;
		grid-template-columns: 1fr 1fr;
	}

	${(p) => p.theme.media.phone} {
		padding: 0;
		grid-template-columns: 1fr;
	}
`

export const StyledUpcomingStream = styled.div`
	background-color: ${(p) => p.theme.color.decentBeton};
	border: 1px dashed black;
`
