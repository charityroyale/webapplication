import React from 'react'
import { StyledLayout } from '../../styles/common.styles'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Main from '../components/Main'

type LayoutProps = {
	children: React.ReactNode
}

const MainLayout: React.FunctionComponent<LayoutProps> = ({ children }) => {
	return (
		<StyledLayout>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</StyledLayout>
	)
}

export default MainLayout
