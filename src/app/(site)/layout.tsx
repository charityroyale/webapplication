'use client'
import React, { PropsWithChildren } from 'react'
import { StyledLayout } from '../../styles/common.styles'
import CookieBanner from '../cms/components/CookieBanner'
import Footer from '../cms/components/Footer/Footer'
import Header from '../cms/components/Header/Header'

const MainLayout: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
	return (
		<StyledLayout>
			<CookieBanner />
			<Header />
			{children}
			<Footer />
		</StyledLayout>
	)
}

export default MainLayout
