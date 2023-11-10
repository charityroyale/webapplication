'use client'

type CookieConsent = 'granted' | 'denied'

export const getGtagCookieConsent = (consent: boolean | null) => {
	return consent ? 'granted' : 'denied'
}

export const trackPageView = (GA_MEASUREMENT_ID: string, url: string) => {
	if (!window.gtag) return
	window.gtag('config', GA_MEASUREMENT_ID, {
		page_path: url,
	})
}

export const updateGtagCookieConsent = (cookieConsent: CookieConsent) => {
	if (!window.gtag) return
	window.gtag('consent', 'update', {
		ad_storage: cookieConsent,
		analytics_storage: cookieConsent,
		functionality_storage: cookieConsent,
		personalization_storage: cookieConsent,
		security_storage: cookieConsent,
	})
}
