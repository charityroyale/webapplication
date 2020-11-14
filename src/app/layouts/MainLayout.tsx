import React from 'react'
import { StyledLayout } from '../../styles/common.styles'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Main from '../components/Main'

type LayoutProps = {
	children: React.ReactNode
	featuredStream: string
}

const MainLayout: React.FunctionComponent<LayoutProps> = ({ children, featuredStream }: LayoutProps) => {
	return (
		<StyledLayout>
			<Header featuredStream={featuredStream} />
			<Main>{children}</Main>
			<Footer featuredStream={featuredStream} />
		</StyledLayout>
	)
}

export default MainLayout
