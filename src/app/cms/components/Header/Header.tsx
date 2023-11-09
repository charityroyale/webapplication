'use client'
import Link from 'next/link'
import React from 'react'

import { useMakeAWish } from '../../../hooks/useMakeAWish'
import { cmsFeaturedStreamLink } from '../../cms'
import ClientLink from '../ClientLink'
import { LanguageSelector } from '../LanguageSelector'
import DonationHeaderCount from './DonationHeaderCount'
import { Text } from '../Text'
import { HeaderSocials } from './HeaderSocials'
import { styled } from 'styled-components'
import {
	StyledHeader,
	StyledHeaderLeftItem,
	StyledHeaderCenterItem,
	StyledHeaderRightItem,
} from '../../../../styles/common.styles'

const StyledHeaderContent = styled.div`
	grid-area: header-row;
	display: flex;
	justify-content: space-between;
	align-items: center;

	${(p) => p.theme.media.tablet} {
		flex-direction: column;
	}

	${(p) => p.theme.media.phone} {
		flex-direction: column;
	}
`

const DonationHeaderCounterAndButtonWrapper = styled.div`
	display: flex;

	${(p) => p.theme.media.phone} {
		width: 100%;
		justify-content: space-between;
		display: block;
	}
`

const MakeAWishLogoLink = styled.a`
	${(p) => p.theme.media.tablet} {
		margin-top: ${(p) => p.theme.space.m}px;
	}

	${(p) => p.theme.media.phone} {
		margin-top: ${(p) => p.theme.space.m}px;
	}
`

const DonateButton = styled.a`
	min-width: 194px;
	padding: 24px 48px;
	text-decoration: none;
	background-color: ${(p) => p.theme.color.veniPurple};
	border: 2px solid ${(p) => p.theme.color.charityTeal};
	color: ${(p) => p.theme.color.white};
	font-size: ${(p) => p.theme.fontSize.l}px;
	letter-spacing: 3px;
	font-family: inherit;
	display: flex;
	align-items: center;
	font-weight: 600;
	margin: 12px 0 12px 10px;
	justify-content: center;
	position: relative;
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
		background-color: ${(p) => p.theme.color.charityTeal};
		border-image-source: linear-gradient(
			to right,
			${(p) => p.theme.color.charityTeal},
			${(p) => p.theme.color.charityTeal}
		);
		cursor: pointer;
	}

	${(p) => p.theme.media.phone} {
		margin: 0;
		margin-top: ${(p) => p.theme.space.l}px;
		font-size: ${(p) => p.theme.fontSize.xl}px;
	}
`

interface DonationButtonProps {
	target?: string
}

const DonationButtonWrapper = styled.div`
	display: block;
	width: 100%;

	${(p) => p.theme.media.phone} {
		margin-bottom: 16px;
	}
	${(p) => p.theme.media.tablet} {
		display: flex;
	}
	${(p) => p.theme.media.desktop} {
		display: flex;
	}

	position: relative;
`

const DonationButton: React.FunctionComponent<DonationButtonProps> = ({ target }: DonationButtonProps) => {
	return (
		<DonationButtonWrapper>
			<Link href={cmsFeaturedStreamLink} legacyBehavior={true}>
				<DonateButton
					href={cmsFeaturedStreamLink}
					target={target}
					rel={target === '_blank' ? 'noreferrer' : ''}
				>
					<span>{<Text content="donateText" />}</span>
				</DonateButton>
			</Link>
			<HeaderSocials />
			<LanguageSelector />
		</DonationButtonWrapper>
	)
}

interface HeaderProps {
	showDonationButton?: boolean
}

const Header: React.FunctionComponent<HeaderProps> = ({ showDonationButton = true }: HeaderProps) => {
	const { makeAWishData, makeAWishDataIsError, makeAWishDataIsLoading } = useMakeAWish()

	return (
		<StyledHeader>
			<StyledHeaderContent>
				<StyledHeaderLeftItem>
					<ClientLink href="/">
						<img
							style={{ display: 'flex' }}
							width="150px"
							src="/cr_logo_small.png"
							alt="Charity Royale Logo"
						/>
					</ClientLink>
					<h1 style={{ textIndent: '-10000px', position: 'absolute' }}>Charity Royale</h1>
				</StyledHeaderLeftItem>
				<StyledHeaderCenterItem>
					<MakeAWishLogoLink target="_bank" rel="noreferrer" href="https://www.make-a-wish.at/">
						<img
							style={{ display: 'flex' }}
							width="250px"
							src="/make_a_wish_international_logo.png"
							alt="Make a wish Logo"
						/>
					</MakeAWishLogoLink>
				</StyledHeaderCenterItem>

				{showDonationButton && (
					<StyledHeaderRightItem>
						<DonationHeaderCounterAndButtonWrapper>
							<DonationHeaderCount
								donation_goal={130000}
								current_donation_count={
									makeAWishDataIsLoading || makeAWishDataIsError
										? 0
										: parseFloat(makeAWishData.total_donation_sum_net)
								}
								donations_count={
									makeAWishDataIsLoading || makeAWishDataIsError
										? 0
										: makeAWishData.total_donation_count
								}
							></DonationHeaderCount>
							<DonationButton />
						</DonationHeaderCounterAndButtonWrapper>
					</StyledHeaderRightItem>
				)}
			</StyledHeaderContent>
		</StyledHeader>
	)
}

export default Header
