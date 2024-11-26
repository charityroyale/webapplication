import React, { Suspense } from 'react'
import { ClientSideRedirectComponent } from '../../components/ClientSideRedirectComponent'

export default async function Page() {
	return (
		<Suspense fallback={null}>
			<ClientSideRedirectComponent />
		</Suspense>
	)
}
