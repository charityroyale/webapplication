import React, { ReactElement } from 'react'
import { styled } from '../../styles/Theme'

export interface List {
	col_1: string | ReactElement
	col_2: string
	col_3: string
}

interface DonationWidgetListProps {
	list: List[]
}

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

const DonationAmount = styled.div`
	color: ${(p) => p.theme.color.charityTeal};
	font-weight: 800;
`

const DonationDonatorPlaceAndName = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
`

const DonationWidgetList: React.FunctionComponent<DonationWidgetListProps> = ({ list }: DonationWidgetListProps) => {
	return (
		<DonationList>
			{list.map((item, index) => (
				<DonationListRow key={index}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span>{item.col_1}</span> <DonationAmount> {item.col_3}€</DonationAmount>
					</div>
					<DonationDonatorPlaceAndName>
						<span>
							<strong>{item.col_2}</strong>
						</span>
					</DonationDonatorPlaceAndName>
				</DonationListRow>
			))}
		</DonationList>
	)
}

export default DonationWidgetList
