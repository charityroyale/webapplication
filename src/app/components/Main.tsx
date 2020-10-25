import React from 'react'
import { StyledMain } from '../../styles/common.styles'

// refactor use typed props with children
interface MainProps {
	children?: JSX.Element[] | JSX.Element
}

const Main: React.FunctionComponent<MainProps> = ({ children }: MainProps) => {
	return <StyledMain>{children}</StyledMain>
}

export default Main
