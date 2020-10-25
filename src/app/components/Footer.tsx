import React from 'react'
import { StyledFooter } from '../../styles/common.styles'

// refactor use typed props with children
interface FooterProps {
	children?: JSX.Element[] | JSX.Element
}

const Footer: React.FunctionComponent<FooterProps> = ({ children }: FooterProps) => {
	return <StyledFooter>{children}</StyledFooter>
}

export default Footer
