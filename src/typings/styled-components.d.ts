import 'styled-components'
import { CrThemeInterface } from '../styles/Theme'

declare module 'styled-components' {
	export interface DefaultTheme extends CrThemeInterface, Empty {}
}
