import React from 'react'
import {
	DonateButton,
	StyledHeader,
	StyledHeaderCenterItem,
	StyledHeaderLeftItem,
	StyledHeaderRightItem,
} from '../../styles/common.styles'

const Header: React.FunctionComponent = () => {
	return (
		<StyledHeader>
			<StyledHeaderLeftItem>
				<a href={'/'}>
					<img width="150px" src="/Charity_Royale_RGB.png" alt="Charity Royale 2020" />
				</a>
				<h1 style={{ textIndent: '-10000px' }}>Charity Royale 2020</h1>
			</StyledHeaderLeftItem>
			<StyledHeaderCenterItem />
			<StyledHeaderRightItem>
				<DonateButton aria-label="Jetzt Spenden">SPENDEN</DonateButton>
			</StyledHeaderRightItem>
		</StyledHeader>
	)
}

export default Header
