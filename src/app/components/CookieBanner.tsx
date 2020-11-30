import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'universal-cookie'
import { styled } from '../../styles/Theme'
const cookies = new Cookies()
const gaDisableCookieName = `ga-disable-${process.env.GA_ID}`

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
	const disable = useCallback(() => {
		setGaDisabled(true)
		cookies.set(gaDisableCookieName, true)
	}, [])

	const enable = useCallback(() => {
		setGaDisabled(false)
		cookies.set(gaDisableCookieName, false)
	}, [])

	useEffect(() => {
		window[gaDisableCookieName] = gaDisabled
	}, [gaDisabled])

	return gaDisabled === undefined ? (
		<CookieWrapper>
			<p>Hilf uns die Charity Royale 2020 Website zu verbessern und erlaube uns Cookies zu verwenden.</p>
			<CookieButtonWrapper>
				<CookieButton onClick={() => disable()}>Cookies zulassen!</CookieButton>
				<CookieButton onClick={() => enable()}>Cookies nicht zulassen!</CookieButton>
			</CookieButtonWrapper>
		</CookieWrapper>
	) : null
}

export default CookieBanner
