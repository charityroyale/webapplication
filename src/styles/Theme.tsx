import baseStyled, { ThemedStyledInterface } from 'styled-components'

export const theme = {
	color: {
		primary: 'red',
		secondary: 'green',
	},
}

// Stronlgy typed theme https://github.com/styled-components/styled-components/issues/1589
export type Theme = typeof theme
export const styled = baseStyled as ThemedStyledInterface<Theme>
