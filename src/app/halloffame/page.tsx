import React from 'react'
import { DonorsResponse } from '../hooks/useDonors'
import { makeAWishAPI } from '../../config'
import { HallOfFameContent } from './components/content'
import { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL('https://charityroyale.at'),
	title: `Charity Royale | Hall Of Fame`,
	openGraph: {
		title: `Charity Royale | Hall Of Fame`,
		description: 'Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.',
		url: '/',
		siteName: `Charity Royale | Hall Of Fame`,
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

const Page = async () => {
	const res = await fetch(makeAWishAPI.donorsURL)
	const donors = ((await res.json()) as DonorsResponse).donors

	return <HallOfFameContent donors={donors} />
}

export default Page
