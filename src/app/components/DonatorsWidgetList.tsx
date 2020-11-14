import React from 'react'
import { styled } from '../../styles/Theme'

export interface List {
	col_1: string
	col_2: string
	col_3: string
}

interface DonationWidgetListProps {
	list: List[]
}

const DonationListRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding: ${(p) => p.theme.space.s}px ${(p) => p.theme.space.s}px;

	&:first-child {
		padding-top: 0;
	}
`

const DonationList = styled.div`
	font-size: ${(p) => p.theme.fontSize.m}px;

	${DonationListRow}:not(:last-child) {
		border-bottom: 2px solid ${(p) => p.theme.color.veniPurple};
	}
`

const DonationAmount = styled.div`
	color: ${(p) => p.theme.color.veniPurple};
	font-weight: 800;
`

const DonationWidgetList: React.FunctionComponent<DonationWidgetListProps> = ({ list }: DonationWidgetListProps) => {
	return (
		<DonationList>
			{list.map((item, index) => (
				<DonationListRow key={index}>
					<div>
						{item.col_1} <strong>{item.col_2}</strong>
					</div>
					<DonationAmount>{item.col_3}€</DonationAmount>
				</DonationListRow>
			))}
		</DonationList>
	)
}

export default DonationWidgetList
