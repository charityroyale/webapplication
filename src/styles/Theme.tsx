import baseStyled, { ThemedStyledInterface } from 'styled-components'

// References to https://blog.agney.dev/styled-components-&-typescript/
const customMediaQuery = (minWidth: number, maxWidth: number): string =>
	`@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`

export const theme = {
	color: {
		primary: 'red',
		secondary: 'green',
		blackPeral: '#050F1A',
		harvestGold: '#E1C478',
		willhaben: '#049EE7',
		decentBeton: '#E6E6E6',
	},
	fontSize: {
		s: 12,
		m: 14,
		l: 18,
		xl: 24,
	},
	space: {
		s: 8,
		m: 12,
		l: 16,
		xl: 24,
	},
	media: {
		desktop: customMediaQuery(769, 9999999),
		tablet: customMediaQuery(577, 768),
		phone: customMediaQuery(0, 576),
	},
}

// Stronlgy typed theme https://github.com/styled-components/styled-components/issues/1589
export type Theme = typeof theme
export const styled = baseStyled as ThemedStyledInterface<Theme>
