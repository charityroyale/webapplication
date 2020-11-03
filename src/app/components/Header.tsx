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
				<p>Hallo Left</p>
			</StyledHeaderLeftItem>
			<StyledHeaderCenterItem />
			<StyledHeaderRightItem>
				<DonateButton aria-label="Jetzt Spenden">SPENDEN</DonateButton>
			</StyledHeaderRightItem>
		</StyledHeader>
	)
}

export default Header
