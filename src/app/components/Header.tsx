import React from 'react'
import {
	DonateButton,
	StyledHeader,
	StyledHeaderCenterItem,
	StyledHeaderLeftItem,
	StyledHeaderRightItem,
} from '../../styles/common.styles'
import Link from 'next/link'
import DonationHeaderCount from './DonationHeaderCount'

const Header: React.FunctionComponent = () => {
	return (
		<StyledHeader>
			<div style={{ gridArea: 'header-row header-row header-row', display: 'flex', justifyContent: 'space-between' }}>
				<StyledHeaderLeftItem>
					<Link href="/">
						<a href="/">
							<img width="150px" src="/Charity_Royale_RGB.png" alt="Charity Royale 2020" />
						</a>
					</Link>
					<h1 style={{ textIndent: '-10000px' }}>Charity Royale 2020</h1>
				</StyledHeaderLeftItem>
				<StyledHeaderCenterItem>
					<DonationHeaderCount
						donation_goal={1000}
						current_donation_count={250}
						donations_count={12}
						donation_days_to_go={23}
					></DonationHeaderCount>
				</StyledHeaderCenterItem>
				<StyledHeaderRightItem>
					<Link href="/donate">
						<DonateButton aria-label="Jetzt Spenden">SPENDEN</DonateButton>
					</Link>
				</StyledHeaderRightItem>
			</div>
		</StyledHeader>
	)
}

export default Header
