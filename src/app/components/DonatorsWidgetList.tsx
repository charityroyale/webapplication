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
		border-bottom: 1px solid black;
	}
`

const DonationAmount = styled.div`
	color: ${(p) => p.theme.color.willhaben};
	font-weight: 800;
`

const DonationWidgetList: React.FunctionComponent<DonationWidgetListProps> = ({ list }: DonationWidgetListProps) => {
	return (
		<DonationList>
			{list.map((item, index) => (
				<DonationListRow key={index}>
					<div style={{ fontWeight: 'bold' }}>{item.col_1}</div>
					<div>{item.col_2}</div>
					<DonationAmount>{item.col_3} €</DonationAmount>
				</DonationListRow>
			))}
		</DonationList>
	)
}

export default DonationWidgetList
