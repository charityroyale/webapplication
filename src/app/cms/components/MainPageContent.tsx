'use client'
import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const MainGrid = styled.main`
	grid-area: main;
	display: grid;
	grid-template-rows: auto auto auto auto auto auto auto;
	grid-template-areas: 'featured' 'faq-box' 'livechannels' 'featured-header' 'upcoming' 'past-header' 'past';

	padding-top: 20px;

	${(p) => p.theme.media.phone} {
		padding-top: 0;
	}
`

export const MainPageContent: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
	return <MainGrid>{children}</MainGrid>
}
