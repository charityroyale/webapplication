'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import cmsContent from '../cms/cms'

export const ClientSideRedirectComponent = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		router.replace(`/${cmsContent.featuredStream}`)
	}, [router, searchParams])
	return <div />
}
