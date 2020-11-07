import React from 'react'
import { StyledDonationMainGrid, StyledLayout } from '../../styles/common.styles'
import Footer from '../components/Footer'
import Header from '../components/Header'

type LayoutProps = {
	children: React.ReactNode
}

const DonationLayout: React.FunctionComponent<LayoutProps> = ({ children }) => {
	return (
		<StyledLayout>
			<Header />
			<StyledDonationMainGrid>{children}</StyledDonationMainGrid>
			<Footer>
				<p>Hallo Left</p>
				<p>Hallo Right</p>
			</Footer>
		</StyledLayout>
	)
}

export default DonationLayout
