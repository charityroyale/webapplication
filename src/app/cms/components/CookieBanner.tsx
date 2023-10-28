'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Text } from './Text'
import { styled } from 'styled-components'
import { GTAG_COOKIE_CONSENT, getLocalStorage, setLocalStorage } from '../../lib/storageHelper'
import { getGtagCookieConsent, updateGtagCookieConsent } from '../../lib/gtagHelper'

const CookieWrapper = styled.div`
	color: white;
	display: flex;
	justify-content: space-between;
	left: 0;
	position: fixed;
	width: 100%;
	z-index: 999;
	bottom: 0;
	padding: 8px 24px;
	align-items: center;
	box-shadow: 0px -4px 8px 0px #00000042;
	background: linear-gradient(to right, ${(p) => p.theme.color.charityBlue}, ${(p) => p.theme.color.charityPink});
	flex-direction: column;

	${(p) => p.theme.media.desktop} {
		flex-direction: row;
	}
`

const CookieButton = styled.button`
	background-color: ${(p) => p.theme.color.veniPurple};
	color: ${(p) => p.theme.color.white};
	padding: 10px;
	border: 2px solid ${(p) => p.theme.color.charityTeal};

	&:hover {
		cursor: pointer;
	}

	&:hover,
	&:focus {
		background-color: ${(p) => p.theme.color.charityTeal};
		color: ${(p) => p.theme.color.veniPurple};
	}
`

const CookieButtonLink = styled.button`
	border: none;
	background-color: transparent;
	text-decoration: underline;

	color: ${(p) => p.theme.color.white};
	padding: 10px;

	&:hover {
		cursor: pointer;
	}
`

const CookieButtonWrapper = styled.div`
	${CookieButton}:first-child {
		margin-right: 8px;
	}

	${(p) => p.theme.media.phone} {
		margin-top: 8px;
	}

	${(p) => p.theme.media.tablet} {
		margin-top: 8px;
	}
`

const CookieBanner: React.FunctionComponent = () => {
	const [cookieConsent, setCookieConsent] = useState<null | boolean>(false)

	useEffect(() => {
		setCookieConsent(getLocalStorage(GTAG_COOKIE_CONSENT, null))
	}, [setCookieConsent])

	useEffect(() => {
		const newCookieConsent = getGtagCookieConsent(cookieConsent)
		updateGtagCookieConsent(newCookieConsent)
		setLocalStorage(GTAG_COOKIE_CONSENT, cookieConsent)
	}, [cookieConsent])

	return cookieConsent === null ? (
		<CookieWrapper>
			<p>
				<Text content="cookieDescription" />
			</p>
			<CookieButtonWrapper>
				<CookieButtonLink onClick={() => setCookieConsent(false)}>
					<Text content="cookieDeclineCTA" />
				</CookieButtonLink>
				<CookieButton onClick={() => setCookieConsent(true)}>
					<Text content="cookieAcceptCTA" />
				</CookieButton>
			</CookieButtonWrapper>
		</CookieWrapper>
	) : null
}

export default CookieBanner
