import React from 'react'
import { FaqContent } from './components/content'
import { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL('https://charityroyale.at'),
	title: `Charity Royale | FAQ`,
	openGraph: {
		title: `Charity Royale | FAQ`,
		description: 'Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.',
		url: '/',
		siteName: `Charity Royale | FAQ`,
		images: [
			{
				url: '/uploads/charity_royale_rgb_300x300.png',
				width: 300,
				height: 300,
			},
		],
		locale: 'de_AT',
		type: 'website',
	},
	twitter: {
		title: `Charity Royale`,
		creator: '@CharityRoyale',
		description: `Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.`,
		images: ['/uploads/charity_royale_rgb_300x300.png'],
	},
}

const FaqPage = () => {
	return <FaqContent />
}
export default FaqPage
