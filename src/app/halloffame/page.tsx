import React from 'react'
import { DonorsResponse } from '../hooks/useDonors'
import { makeAWishAPI } from '../../config'
import { HallOfFameContent } from './components/content'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Charity Royale | Hall Of Fame`,
	openGraph: {
		title: `Charity Royale | Hall Of Fame`,
		siteName: `Charity Royale | Hall Of Fame`,
	},
	twitter: {
		title: `Charity Royale | Hall Of Fame`,
	},
}

const Page = async () => {
	const res = await fetch(makeAWishAPI.donorsURL)
	const donors = ((await res.json()) as DonorsResponse).donors
	return <HallOfFameContent donors={donors} />
}

export default Page
