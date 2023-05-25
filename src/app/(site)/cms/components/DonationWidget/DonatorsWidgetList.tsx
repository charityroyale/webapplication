import React, { ReactElement } from 'react'
import { styled } from '../../../../../styles/Theme'
import { formatMoneyWithSign } from '../../../utils/formatUtils'

const DonationListRow = styled.div`
	padding: ${(p) => p.theme.space.s}px 0;

	&:first-child {
		padding-top: 0;
	}
`

const DonationList = styled.div`
	font-size: ${(p) => p.theme.fontSize.m}px;
	color: ${(p) => p.theme.color.white};

	> div:not(:last-child) {
		border-bottom: 1px solid ${(p) => p.theme.color.white};
	}
`

const DonationAmount = styled.div<{ isZero: boolean }>`
	color: ${(p) => (p.isZero ? p.theme.color.white : p.theme.color.charityTeal)};
	font-weight: 800;
`

const DonationDonatorPlaceAndName = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
`

export interface DonationListItem {
	col_1: string | ReactElement
	col_2: string | ReactElement
	col_3: string
}

interface DonationWidgetListProps {
	donationsList: DonationListItem[]
}

const DonationWidgetList: React.FunctionComponent<DonationWidgetListProps> = ({
	donationsList,
}: DonationWidgetListProps) => {
	return (
		<DonationList>
			{donationsList.map((item, index) => {
				return (
					<DonationListRow key={index}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span>{item.col_1}</span>{' '}
							<DonationAmount isZero={parseFloat(item.col_3) <= 0}>
								{formatMoneyWithSign(item.col_3)}
							</DonationAmount>
						</div>
						<DonationDonatorPlaceAndName>
							<span>
								<strong>{item.col_2}</strong>
							</span>
						</DonationDonatorPlaceAndName>
					</DonationListRow>
				)
			})}
		</DonationList>
	)
}

export default DonationWidgetList
