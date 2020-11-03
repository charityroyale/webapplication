import baseStyled, { ThemedStyledInterface } from 'styled-components'
import { responsiveMaxSizeThreshold } from '../app/utils/commonUtils'

// References to https://blog.agney.dev/styled-components-&-typescript/
const customMediaQuery = (minWidth: number, maxWidth: number): string =>
	`@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`

export const theme = {
	color: {
		white: 'white',
		black: 'black',
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
		xs: 4,
		s: 8,
		m: 12,
		l: 16,
		xl: 24,
		xxl: 36,
	},
	media: {
		desktop: customMediaQuery(769, responsiveMaxSizeThreshold.desktop),
		tablet: customMediaQuery(577, responsiveMaxSizeThreshold.tablet),
		phone: customMediaQuery(0, responsiveMaxSizeThreshold.phone),
	},
}

// Stronlgy typed theme https://github.com/styled-components/styled-components/issues/1589
export type Theme = typeof theme
export const styled = baseStyled as ThemedStyledInterface<Theme>
