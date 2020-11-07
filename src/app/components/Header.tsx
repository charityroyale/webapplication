import React from 'react'
import {
	DonateButton,
	StyledHeader,
	StyledHeaderCenterItem,
	StyledHeaderLeftItem,
	StyledHeaderRightItem,
} from '../../styles/common.styles'
import Link from 'next/link'

const Header: React.FunctionComponent = () => {
	return (
		<StyledHeader>
			<StyledHeaderLeftItem>
				<Link href="/">
					<a href="/">
						<img width="150px" src="/Charity_Royale_RGB.png" alt="Charity Royale 2020" />
					</a>
				</Link>
				<h1 style={{ textIndent: '-10000px' }}>Charity Royale 2020</h1>
			</StyledHeaderLeftItem>
			<StyledHeaderCenterItem />
			<StyledHeaderRightItem>
				<Link href="/donate">
					<DonateButton aria-label="Jetzt Spenden">SPENDEN</DonateButton>
				</Link>
			</StyledHeaderRightItem>
		</StyledHeader>
	)
}

export default Header
