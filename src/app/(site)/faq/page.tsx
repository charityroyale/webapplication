import React from 'react'
import { FaqContent } from './components/content'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Charity Royale | FAQ`,
	openGraph: {
		title: `Charity Royale | FAQ`,
		siteName: `Charity Royale | FAQ`,
	},
	twitter: {
		title: `Charity Royale | FAQ`,
	},
}

const FaqPage = () => {
	return <FaqContent />
}
export default FaqPage
