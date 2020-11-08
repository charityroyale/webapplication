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

const Header: React.FunctionComponent = () => {
	const isSSR = useIsSSR()
	const [imageLoaded, setIsImagedLoaded] = useState(false)

	const onImageLoad = useCallback(() => {
		setIsImagedLoaded(true)
	}, [])

	return (
		<StyledHeader>
			<div style={{ gridArea: 'header-row', display: 'flex', justifyContent: 'space-between' }}>
				<StyledHeaderLeftItem>
					{!imageLoaded && <Skeleton circle={true} height={140} width={140} />}
					<Link href="/">
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
					</Link>
					<h1 style={{ textIndent: '-10000px' }}>Charity Royale 2020</h1>
				</StyledHeaderLeftItem>
				<StyledHeaderCenterItem></StyledHeaderCenterItem>
				<StyledHeaderRightItem>
					<DonationHeaderCount
						donation_goal={1000}
						current_donation_count={250}
						donations_count={12}
						donation_days_to_go={23}
					></DonationHeaderCount>
					<Link href="/donate">
						<DonateButton aria-label="Jetzt Spenden">SPENDEN</DonateButton>
					</Link>
				</StyledHeaderRightItem>
			</div>
		</StyledHeader>
	)
}

export default Header
