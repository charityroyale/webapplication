import React from 'react'
import { StyledLayout } from '../../styles/common.styles'
import { styled } from '../../styles/Theme'
import CookieBanner from '../components/CookieBanner'
import Footer from '../components/Footer'
import Header from '../components/Header'

const MainGrid = styled.main`
	grid-area: main;
	display: grid;
	grid-template-rows: auto auto auto auto auto auto;
	grid-template-areas: 'featured' 'faq-box' 'featured-header' 'upcoming' 'past-header' 'past';

	padding-top: 20px;

	${(p) => p.theme.media.phone} {
		padding-top: 0;
	}
`

interface MainLayoutProps {
	children: React.ReactNode
}

const MainLayout: React.FunctionComponent<MainLayoutProps> = ({ children }: MainLayoutProps) => {
	return (
		<StyledLayout>
			<CookieBanner />
			<Header />
			<MainGrid>{children}</MainGrid>
			<Footer />
		</StyledLayout>
	)
}

export default MainLayout
