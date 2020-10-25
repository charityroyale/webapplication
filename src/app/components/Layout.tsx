import React from 'react'
import { StyledLayout } from '../../styles/common.styles'

interface LayoutProps {
	children?: JSX.Element[]
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }: LayoutProps) => {
	return <StyledLayout>{children}</StyledLayout>
}

export default Layout
