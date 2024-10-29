'use client'

import React from 'react'
import { styled } from 'styled-components'

export default function NotFound() {
	return (
		<ErrorWraper>
			<ErrorTitle>Diese Seite gibt es nicht</ErrorTitle>
			<ErrorDescription>
				Hast du dich verirrt? <a href="/">Hier gehts zur Hauptseite</a>
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
