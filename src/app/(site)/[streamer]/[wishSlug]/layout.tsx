'use client'
import React, { PropsWithChildren, Suspense } from 'react'
import { StyledLayout } from '../../../../styles/common.styles'
import CookieBanner from '../../../cms/components/CookieBanner'
import Footer from '../../../cms/components/Footer/Footer'
import GoogleAnalytics from '../../../cms/components/GoogleAnalytics'
import Header from '../../../cms/components/Header/Header'

const MainLayout: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
	return (
		<React.Fragment>
			<Suspense fallback={null}>
				<GoogleAnalytics GA_MEASUREMENT_ID="G-2LB5JE6MLN" />
			</Suspense>
			<StyledLayout>
				<CookieBanner />
				<Header layout="donationpage" />
				{children}
				<Footer />
			</StyledLayout>
		</React.Fragment>
	)
}

export default MainLayout
