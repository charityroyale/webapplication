'use client'

import React, { useEffect } from 'react'
import styled from 'styled-components'

export default function Error({ error }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<ErrorWraper>
			<ErrorTitle>Fehler Royale: Do hots wos :-(</ErrorTitle>
			<ErrorDescription>
				Leider ist ein Problem aufgetreten. Bitte lade die Seite in ein paar Minuten nocheinmal. Sollte das
				Problem weiterbestehen melde dich bitte bei uns.
			</ErrorDescription>
		</ErrorWraper>
	)
}

const ErrorTitle = styled.h2`
	color: ${(p) => p.theme.color.white};
	text-align: center;
	font-size: ${(p) => p.theme.fontSize.xl}px;
`
const ErrorDescription = styled.p`
	color: ${(p) => p.theme.color.white};
	text-align: center;
	font-size: ${(p) => p.theme.fontSize.l}px;
`

const ErrorWraper = styled.div`
	height: 100vh;
	display: flex;
	padding: 24px 24px;
	align-items: center;
	gap: 12px;
	justify-content: center;
	flex-direction: column;
`
