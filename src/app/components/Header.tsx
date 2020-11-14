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
			<div style={{ gridArea: 'header-row', display: 'flex', justifyContent: 'space-between' }}>
				<StyledHeaderLeftItem>
					<ClientLink href="/">
						{!imageLoaded && <Skeleton circle={true} height={140} width={140} />}
						{!isSSR && (
							<img
								onLoad={onImageLoad}
								style={{ display: !imageLoaded ? 'none' : 'flex' }}
								width="150px"
								src="/Charity_Royale_RGB.png"
								alt="Charity Royale 2020"
							/>
						)}
					</ClientLink>
					<h1 style={{ textIndent: '-10000px' }}>Charity Royale 2020</h1>
				</StyledHeaderLeftItem>
				<StyledHeaderCenterItem></StyledHeaderCenterItem>
				<StyledHeaderRightItem>
					<DonationHeaderCount
						donation_goal={1000}
						current_donation_count={makeAWish.isLoading || makeAWish.isError ? 0 : makeAWish.data.total_donation_count}
						donations_count={12}
						donation_days_to_go={23}
					></DonationHeaderCount>
					<ClientLink href={`/donate/${featuredStream}`}>
						<DonateButton aria-label="Jetzt Spenden">SPENDEN</DonateButton>
					</ClientLink>
				</StyledHeaderRightItem>
			</div>
		</StyledHeader>
	)
}

export default Header
