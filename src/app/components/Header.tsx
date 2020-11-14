import React, { useCallback, useState } from 'react'
import {
	DonateButton,
	StyledHeader,
	StyledHeaderCenterItem,
	StyledHeaderLeftItem,
	StyledHeaderRightItem,
} from '../../styles/common.styles'
import Link from 'next/link'
import DonationHeaderCount from './DonationHeaderCount'
import { useIsSSR } from './isSSR'
import Skeleton from 'react-loading-skeleton'
import useMakeAWish from '../hooks/useMakeAWish'
import { styled } from '../../styles/Theme'

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
		flex-direction: column;
	}
`

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
					{!imageLoaded && <Skeleton circle={true} height={140} width={140} />}
					<a href="/">
						{!isSSR && (
							<img
								onLoad={onImageLoad}
								style={{ display: !imageLoaded ? 'none' : 'flex' }}
								width="150px"
								src="/Charity_Royale_RGB.png"
								alt="Charity Royale 2020"
							/>
						)}
					</a>
					<h1 style={{ textIndent: '-10000px' }}>Charity Royale 2020</h1>
				</StyledHeaderLeftItem>
				<StyledHeaderCenterItem></StyledHeaderCenterItem>
				<StyledHeaderRightItem>
					<DonationHeaderCounterAndButtonWrapper>
						<DonationHeaderCount
							donation_goal={50000}
							current_donation_count={
								makeAWish.isLoading || makeAWish.isError ? 0 : parseInt(makeAWish.data.total_donation_sum)
							}
							donations_count={makeAWish.isLoading || makeAWish.isError ? 0 : makeAWish.data.total_donation_count}
						></DonationHeaderCount>
						<Link href={`/donate/${featuredStream}`}>
							<DonateButton aria-label="Jetzt Spenden">SPENDEN</DonateButton>
						</Link>
					</DonationHeaderCounterAndButtonWrapper>
				</StyledHeaderRightItem>
			</StyledHeaderContent>
		</StyledHeader>
	)
}

export default Header
