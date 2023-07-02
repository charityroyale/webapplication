import 'styled-components'
import { CrThemeInterface } from '../styles/Theme'

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends CrThemeInterface {}
}
