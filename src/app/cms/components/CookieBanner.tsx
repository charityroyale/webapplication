'use client'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'universal-cookie'
import { Text } from './Text'
import { styled } from 'styled-components'

const cookies = new Cookies()
const gaDisableCookieName = `ga-disable-G-2LB5JE6MLN`

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
	const [gaDisabled, setGaDisabled] = useState(cookies.get(gaDisableCookieName))
	const [isMounted, setIsMounted] = useState(false)
	const disable = useCallback(() => {
		setGaDisabled(true)
		cookies.set(gaDisableCookieName, true, { path: '/', maxAge: 2147483647 })
	}, [])

	const enable = useCallback(() => {
		setGaDisabled(false)
		cookies.set(gaDisableCookieName, false, { path: '/', maxAge: 2147483647 })
	}, [])

	useEffect(() => {
		;(window as unknown as { [key: string]: boolean })[gaDisableCookieName] = gaDisabled
	}, [gaDisabled])

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return isMounted && gaDisabled === undefined ? (
		<CookieWrapper>
			<p>
				<Text content="cookieDescription" />
			</p>
			<CookieButtonWrapper>
				<CookieButtonLink onClick={() => disable()}>
					<Text content="cookieDeclineCTA" />
				</CookieButtonLink>
				<CookieButton onClick={() => enable()}>
					<Text content="cookieAcceptCTA" />
				</CookieButton>
			</CookieButtonWrapper>
		</CookieWrapper>
	) : null
}

export default CookieBanner
