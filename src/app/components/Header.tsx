import React from 'react'
import { StyledHeader } from '../../styles/common.styles'

const Header: React.FunctionComponent = ({ children }) => {
	return <StyledHeader>{children}</StyledHeader>
}

export default Header
