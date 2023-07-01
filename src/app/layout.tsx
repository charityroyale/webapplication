import React from 'react'
import { CrThemeProvider } from './(site)/provider/CrThemeProvider'

export const metadata = {
	title: 'Charity Royale',
	description: 'Charity Royale',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="de-AT">
			<body>
				<CrThemeProvider>{children}</CrThemeProvider>
			</body>
		</html>
	)
}
