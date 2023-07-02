import React from 'react'
import { AllProviders } from './(site)/provider/AllProviders'
import 'react-loading-skeleton/dist/skeleton.css'

export const metadata = {
	title: 'Charity Royale',
	description: 'Charity Royale',
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
