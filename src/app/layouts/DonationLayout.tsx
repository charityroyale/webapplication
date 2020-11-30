import React from 'react'
import { StyledDonationMainGrid, StyledLayout } from '../../styles/common.styles'
import CookieBanner from '../components/CookieBanner'
import Footer from '../components/Footer'
import Header from '../components/Header'

type LayoutProps = {
	children: React.ReactNode
	featuredStream: string
}

const DonationLayout: React.FunctionComponent<LayoutProps> = ({ children, featuredStream }: LayoutProps) => {
	return (
		<StyledLayout>
			<CookieBanner />
			<Header featuredStream={featuredStream} showDonationButton={false} />
			<StyledDonationMainGrid>{children}</StyledDonationMainGrid>
			<Footer featuredStream={featuredStream} />
		</StyledLayout>
	)
}

export default DonationLayout
