import React, { Suspense } from 'react'
import cmsContent from '../../../cms/cms'
import { ClientSideRedirectComponent } from '../../../components/ClientSideRedirectComponent'

export async function generateStaticParams() {
	const featuredSlug = cmsContent.featuredStream.split('/')[0]
	return featuredSlug ? [{ streamerChannel: featuredSlug }] : [{ streamerChannel: 'A' }]
}

export default async function Page() {
	return (
		<Suspense fallback={null}>
			<ClientSideRedirectComponent />
		</Suspense>
	)
}
