'use client'

export const GTAG_COOKIE_CONSENT = 'cookie_consent'

export const getLocalStorage = (key: string, defaultValue: any) => {
	const stickyValue = localStorage.getItem(key)

	return stickyValue !== null && stickyValue !== 'undefined' ? JSON.parse(stickyValue) : defaultValue
}
export const setLocalStorage = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value))
}
