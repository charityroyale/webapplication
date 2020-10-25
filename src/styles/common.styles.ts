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
`

export const StyledFooter = styled.footer`
	grid-area: footer;
	display: grid;
	grid-template-columns: 6fr 1fr;
	grid-template-areas: 'left right';
`

export const StyledMain = styled.main`
	grid-area: main;
	display: grid;
	grid-template-rows: auto auto;
	grid-template-areas: 'featured' 'upcoming';
`
export const StyledFeatured = styled.div`
	grid-area: featured;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const StyledUpcoming = styled.div`
	grid-area: upcoming;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;

	${(p) => p.theme.media.phone} {
		grid-template-columns: 1fr;
	}

	${(p) => p.theme.media.tablet} {
		grid-template-columns: 1fr 1fr;
	}
`
