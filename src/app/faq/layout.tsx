'use client'
import React, { PropsWithChildren } from 'react'
import { StyledLayout } from '../../styles/common.styles'
import { styled } from '../../styles/Theme'
import CookieBanner from '../(site)/cms/components/CookieBanner'
import Footer from '../(site)/cms/components/Footer/Footer'
import Header from '../(site)/cms/components/Header/Header'

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

const MainLayout: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
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
