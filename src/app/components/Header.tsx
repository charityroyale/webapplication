import React from 'react'
import { StyledHeader } from '../../styles/common.styles'

// refactor use typed props with children
interface HeaderProps {
	children?: JSX.Element[] | JSX.Element
}

const Header: React.FunctionComponent<HeaderProps> = ({ children }: HeaderProps) => {
	return <StyledHeader>{children}</StyledHeader>
}

export default Header
