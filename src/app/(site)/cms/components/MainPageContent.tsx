'use client'
import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import CookieBanner from './CookieBanner'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import { StyledLayout } from '../../../../styles/common.styles'

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

export const MainPageContent: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
	return (
		<StyledLayout>
			<CookieBanner />
			<Header />
			<MainGrid>{children}</MainGrid>
			<Footer />
		</StyledLayout>
	)
}
