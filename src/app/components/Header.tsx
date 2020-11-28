import React, { useCallback, useState } from 'react'
import {
	StyledHeader,
	StyledHeaderCenterItem,
	StyledHeaderLeftItem,
	StyledHeaderRightItem,
} from '../../styles/common.styles'
import DonationHeaderCount from './DonationHeaderCount'
import { useIsSSR } from './isSSR'
import Skeleton from 'react-loading-skeleton'
import useMakeAWish from '../hooks/useMakeAWish'
import ClientLink from './ClientLink'
import { styled } from '../../styles/Theme'
import Link from 'next/link'

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
	}
`

interface DonationButtonProps {
	featuredStream: string
	text: string
	target?: string
}

const DonationButton: React.FunctionComponent<DonationButtonProps> = ({
	target,
	text,
	featuredStream,
}: DonationButtonProps) => {
	return (
		<Link href={`/donate/${featuredStream}`}>
			<DonateButton href={`/donate/${featuredStream}`} target={target} rel={target === '_blank' ? 'noreferrer' : ''}>
				<span>{text}</span>
			</DonateButton>
		</Link>
	)
}

const Header: React.FunctionComponent<{ featuredStream: string; showDonationButton?: boolean }> = ({
	featuredStream,
	showDonationButton = true,
}: {
	showDonationButton?: boolean
	featuredStream: string
}) => {
	const isSSR = useIsSSR()
	const [imageLoaded, setIsImagedLoaded] = useState(false)

	const makeAWish = useMakeAWish()

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
								src="/cr2020_logo_small.png"
								alt="Charity Royale 2020 Logo"
							/>
						)}
					</ClientLink>
					<h1 style={{ textIndent: '-10000px', position: 'absolute' }}>Charity Royale 2020</h1>
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
								donation_goal={50000}
								current_donation_count={
									makeAWish.isLoading || makeAWish.isError ? 0 : parseInt(makeAWish.data.total_donation_sum)
								}
								donations_count={makeAWish.isLoading || makeAWish.isError ? 0 : makeAWish.data.total_donation_count}
							></DonationHeaderCount>
							<DonationButton text={'SPENDEN'} featuredStream={featuredStream}></DonationButton>
						</DonationHeaderCounterAndButtonWrapper>
					</StyledHeaderRightItem>
				)}
			</StyledHeaderContent>
		</StyledHeader>
	)
}

export default Header
