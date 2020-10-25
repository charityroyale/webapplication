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
