import React from 'react'

export const metadata = {
	title: 'Charity Royale',
	description: 'description',
}

async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang={'en'}>
			<body>{children}</body>
		</html>
	)
}

export default RootLayout
