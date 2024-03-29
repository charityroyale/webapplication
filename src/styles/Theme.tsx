import { customMediaQuery, responsiveMaxSizeThreshold } from '../app/utils/commonUtils'

export const crTheme = {
	color: {
		white: 'white',
		black: 'black',
		primary: 'red',
		secondary: 'green',
		blackPeral: '#050F1A',
		veniPurple: '#231565',
		willhaben: '#049EE7',
		decentBeton: '#E6E6E6',
		emerald: '#50C878',
		recordRed: '#F16373',
		charityPink: '#C03BE4',
		charityBlue: '#0999F9',
		charityTeal: '#7DF8FF',
	},
	fontSize: {
		s: 12,
		m: 14,
		l: 18,
		xl: 24,
	},
	gridGrap: {
		phone: 8,
		tablet: 24,
		desktop: 28,
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
		desktop: customMediaQuery(responsiveMaxSizeThreshold.tablet + 1, responsiveMaxSizeThreshold.desktop),
		tablet: customMediaQuery(responsiveMaxSizeThreshold.phone + 1, responsiveMaxSizeThreshold.tablet),
		phone: customMediaQuery(0, responsiveMaxSizeThreshold.phone),
	},
}

export type CrThemeInterface = typeof crTheme
