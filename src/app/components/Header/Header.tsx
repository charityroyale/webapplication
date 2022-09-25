import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import {
	StyledHeader,
	StyledHeaderLeftItem,
	StyledHeaderCenterItem,
	StyledHeaderRightItem,
} from '../../../styles/common.styles'
import { styled } from '../../../styles/Theme'
import { cmsFeaturedStreamLink } from '../../cms/cms'
import { useIsSSR } from '../../hooks/useIsSSR'
import { useMakeAWish } from '../../hooks/useMakeAWish'
import ClientLink from '../ClientLink'
import { LanguageSelector } from '../LanguageSelector'
import DonationHeaderCount from './DonationHeaderCount'
import { Text } from '../Text'
import { HeaderSocials } from './HeaderSocials'

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
			<Link href={cmsFeaturedStreamLink}>
				<DonateButton href={cmsFeaturedStreamLink} target={target} rel={target === '_blank' ? 'noreferrer' : ''}>
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
	const isSSR = useIsSSR()
	const [imageLoaded, setIsImagedLoaded] = useState(false)
	const { makeAWishData, makeAWishDataIsError, makeAWishDataIsLoading } = useMakeAWish()

	const onImageLoad = useCallback(() => {
		setIsImagedLoaded(true)
	}, [])

	return (
		<StyledHeader>
			<StyledHeaderContent>
				<StyledHeaderLeftItem>
					<ClientLink href="/">
						{!imageLoaded && <Skeleton circle={true} height={150} width={150} />}
						{!isSSR && (
							<img
								onLoad={onImageLoad}
								style={{ display: !imageLoaded ? 'none' : 'flex', margin: 'auto' }}
								width="150px"
								src="/cr_logo_small.png"
								alt="Charity Royale Logo"
							/>
						)}
					</ClientLink>
					<h1 style={{ textIndent: '-10000px', position: 'absolute' }}>Charity Royale</h1>
				</StyledHeaderLeftItem>
				<StyledHeaderCenterItem>
					<MakeAWishLogoLink target="_bank" rel="noreferrer" href="https://www.make-a-wish.at/">
						{!isSSR && (
							<img
								onLoad={onImageLoad}
								style={{ display: !imageLoaded ? 'none' : 'flex' }}
								width="250px"
								src="/make-a-wish-oesterreich-logo-white.svg"
								alt="Make a wish Logo"
							/>
						)}
					</MakeAWishLogoLink>
				</StyledHeaderCenterItem>

				{showDonationButton && (
					<StyledHeaderRightItem>
						<DonationHeaderCounterAndButtonWrapper>
							<DonationHeaderCount
								donation_goal={100000}
								current_donation_count={
									makeAWishDataIsLoading || makeAWishDataIsError ? 0 : parseFloat(makeAWishData.total_donation_sum)
								}
								donations_count={
									makeAWishDataIsLoading || makeAWishDataIsError ? 0 : makeAWishData.total_donation_count
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
