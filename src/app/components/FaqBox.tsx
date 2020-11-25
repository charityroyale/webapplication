import Link from 'next/link'
import React from 'react'
import { styled } from '../../styles/Theme'

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

const FaqButton = styled.a`
	width: 100%;
	height: 100%;
	border: 2px solid ${(p) => p.theme.color.charityTeal};
	background-color: ${(p) => p.theme.color.veniPurple};
	color: ${(p) => p.theme.color.white};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${(p) => p.theme.fontSize.l}px;
	font-weight: 600;
	transition: background-color 0.17s;

	border: 10px solid;
	border-width: 3px;
	border-image-slice: 1;
	border-image-source: linear-gradient(
		to right,
		${(p) => p.theme.color.charityTeal},
		${(p) => p.theme.color.charityPink}
	);
	box-shadow: 4px 4px 3px 1px #000000;

	&:hover,
	&:focus {
		color: ${(p) => p.theme.color.veniPurple};
		border-image-source: linear-gradient(
			to right,
			${(p) => p.theme.color.charityTeal},
			${(p) => p.theme.color.charityTeal}
		);
		background-color: ${(p) => p.theme.color.charityTeal};
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
				<Link href="/faq">
					<FaqButton href="/faq">Fragen & Antworten</FaqButton>
				</Link>
			</FaqGridButtonItem>
		</FaqGrid>
	)
}

export default FaqBox
