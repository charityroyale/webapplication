import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { Metadata } from 'next'
import { AllProviders } from './provider/AllProviders'

export const metadata: Metadata = {
	metadataBase: new URL('https://charityroyale.at'),
	title: 'Charity Royale',
	description: 'Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.',
	openGraph: {
		url: '/',
		description: 'Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.',
		siteName: 'Charity Royale',
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
		creator: '@CharityRoyale',
		description: 'Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.',
		images: ['/uploads/charity_royale_rgb_300x300.png'],
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de-AT">
			<body>
				<AllProviders>{children}</AllProviders>
			</body>
		</html>
	)
}
