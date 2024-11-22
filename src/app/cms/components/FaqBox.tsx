'use client'
import Link from 'next/link'
import React from 'react'
import { Text } from './Text'
import { styled } from 'styled-components'
import cmsContent from '../cms'

const ButtonsGrid = styled.div`
	grid-area: faq-box;
	margin: auto;
	padding: ${(p) => p.theme.space.xxl}px ${(p) => p.theme.space.xl}px 0 ${(p) => p.theme.space.xl}px;
`

const ButtonsContent = styled.div`
	display: grid;
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px);
	grid-template-rows: 100px;
	grid-gap: ${(p) => p.theme.gridGrap.desktop}px;

	${(p) => p.theme.media.tablet} {
		padding: ${(p) => p.theme.space.xl}px ${(p) => p.theme.space.xl}px;
		padding-top: ${(p) => p.theme.space.xxl}px;
		grid-gap: ${(p) => p.theme.gridGrap.tablet}px;
	}

	${(p) => p.theme.media.phone} {
		grid-template-columns: minmax(auto, 900px);
		grid-template-rows: 100px 100px;
		padding: 0;
		padding-top: ${(p) => p.theme.space.xxl}px;
	}
`

const Button = styled.a`
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

const ButtonItemWrapper = styled.div`
	* {
		width: 100%;
		height: 100%;
	}

	a {
		text-decoration: none;

		span {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`

const GoalText = styled.p`
	color: ${(p) => p.theme.color.white};
	max-width: 600px;
	text-align: center;
	margin: auto;
	margin-bottom: 24px;
	font-size: ${(p) => p.theme.fontSize.xl}px;

	strong {
		font-size: ${(p) => p.theme.fontSize.xl}px;
		color: ${(p) => p.theme.color.charityTeal};
		text-shadow: 2px 2px 0px #7df8ff30;
	}

	${(p) => p.theme.media.tablet} {
		font-size: 24px;
	}

	${(p) => p.theme.media.phone} {
		font-size: 18px;
	}
`

const GoalTitle = styled.p`
	font-size: 54px;
	text-align: center;
	margin-bottom: 32px;
	color: ${(p) => p.theme.color.white};
	font-weight: bold;

	${(p) => p.theme.media.tablet} {
		font-size: 38px;
	}

	${(p) => p.theme.media.phone} {
		font-size: 24px;
	}
`

const ButtonsBox: React.FunctionComponent = () => {
	return (
		<ButtonsGrid>
			<GoalTitle>Road to 1 Million Euro</GoalTitle>
			<GoalText>
				<Text content="donationGoalCall" />
			</GoalText>

			<ButtonsContent>
				{cmsContent.applyLink ? (
					<ButtonItemWrapper>
						<Button href={cmsContent.applyLink} target="_blank">
							<Text content="applyAsStreamerCTA" />
						</Button>
					</ButtonItemWrapper>
				) : (
					<ButtonItemWrapper>
						<Button href="https://www.make-a-wish.at/" target="_blank">
							<Text content="mawCta" />
						</Button>
					</ButtonItemWrapper>
				)}

				<ButtonItemWrapper>
					<Link href="/faq" legacyBehavior={true}>
						<Button href="/faq">
							<Text content="questionsAndAnswersCTA" />
						</Button>
					</Link>
				</ButtonItemWrapper>
			</ButtonsContent>
		</ButtonsGrid>
	)
}

export default ButtonsBox
