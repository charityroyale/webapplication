import React from 'react'
import { styled } from '../../styles/Theme'
import ClientLink from './ClientLink'

const FaqGrid = styled.div`
	grid-area: faq-box;
	display: grid;
	margin: auto;
	grid-template-columns: minmax(auto, 300px);
	grid-template-rows: 100px;
	grid-gap: ${(p) => p.theme.gridGrap.desktop}px;
	padding: ${(p) => p.theme.space.xxl}px ${(p) => p.theme.space.xl}px 0 ${(p) => p.theme.space.xl}px;

	${(p) => p.theme.media.tablet} {
		padding: ${(p) => p.theme.space.xl}px ${(p) => p.theme.space.xl}px;
		padding-top: ${(p) => p.theme.space.xxl}px;
		grid-gap: ${(p) => p.theme.gridGrap.tablet}px;
	}

	${(p) => p.theme.media.phone} {
		padding: 0;
		padding-top: ${(p) => p.theme.space.xxl}px;
		grid-gap: ${(p) => p.theme.gridGrap.phone}px;
	}
`

const FaqButton = styled.button`
	width: 100%;
	height: 100%;
	border: 2px solid ${(p) => p.theme.color.royaleGold};
	background-color: ${(p) => p.theme.color.veniPurple};
	color: ${(p) => p.theme.color.white};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${(p) => p.theme.fontSize.l}px;
	font-weight: 600;

	&:hover {
		cursor: pointer;
	}
`

const FaqGridButtonItem = styled.div`
	* {
		width: 100%;
		height: 100%;
	}

	a {
		text-decoration: none;
	}
`

const FaqBox: React.FunctionComponent = () => {
	return (
		<FaqGrid>
			<FaqGridButtonItem>
				<ClientLink href="/faq">
					<FaqButton aria-label={'Fragen und Antworten'}>Fragen & Antworten</FaqButton>
				</ClientLink>
			</FaqGridButtonItem>
		</FaqGrid>
	)
}

export default FaqBox
