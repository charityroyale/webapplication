import React, { useCallback, useState } from 'react'
import {
	DonateButton,
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
		align-items: center;
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
				{text}
			</DonateButton>
		</Link>
	)
}

const Header: React.FunctionComponent<{ featuredStream: string }> = ({
	featuredStream,
}: {
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
								style={{ display: !imageLoaded ? 'none' : 'flex' }}
								width="150px"
								src="/Charity_Royale_RGB.png"
								alt="Charity Royale 2020 Logo"
							/>
						)}
					</ClientLink>
					<h1 style={{ textIndent: '-10000px' }}>Charity Royale 2020</h1>
				</StyledHeaderLeftItem>
				<StyledHeaderCenterItem>
					{!isSSR && (
						<img
							onLoad={onImageLoad}
							style={{ display: !imageLoaded ? 'none' : 'flex' }}
							width="200px"
							src="/make_a_wish_logo.png"
							alt="Make a wish Logo"
						/>
					)}
				</StyledHeaderCenterItem>
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
			</StyledHeaderContent>
		</StyledHeader>
	)
}

export default Header
