'use client'

import React, { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { pageview } from '../../lib/gtagHelper'

/**
 * hints for access in consent mode
 * inspired by https://gaudion.dev/blog/setup-google-analytics-with-gdpr-compliant-cookie-consent-in-nextjs13
gcs=G100 - means that both Ad Storage & Analytics have been denied
gcs=G111 - means that both Ad Storage & Analytics have been granted
gcs=G1-0 - means that both Ad Storage hasn't been set and Analytics has been granted
 */

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		const url = pathname + searchParams.toString()

		pageview(GA_MEASUREMENT_ID, url)
	}, [pathname, searchParams, GA_MEASUREMENT_ID])

	return (
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
			/>
			<Script
				id="google-analytics"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('consent', 'default', {
                        'analytics_storage': 'denied',
                        'ad_storage': 'denied',
                        'functionality_storage': 'denied',
                        'personalization_storage': 'denied',
                        'security_storage': 'denied',
                    });
                    
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                        page_path: window.location.pathname,
                    });
                `,
				}}
			/>
		</>
	)
}
