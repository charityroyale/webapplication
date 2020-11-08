import React from 'react'
import { getPercentage } from '../utils/commonUtils'
import { styled } from '../../styles/Theme'

interface DonationHeaderCountProps {
	donation_goal: number
	current_donation_count: number
	donations_count: number
	donation_days_to_go: number
}

const DonationCountWrapper = styled.div`
	display: flex;
	justify-content: center;
	font-size: ${(p) => p.theme.fontSize.l}px;
	font-weight: bold;
	flex-direction: column;
	background-color: ${(p) => p.theme.color.white};
	color: ${(p) => p.theme.color.willhaben};
	padding: ${(p) => p.theme.space.m}px;
`

const DonationHeaderCount: React.FunctionComponent<DonationHeaderCountProps> = ({
	donation_goal,
	current_donation_count,
	donations_count,
	donation_days_to_go,
}: DonationHeaderCountProps) => {
	const percentage = getPercentage(current_donation_count, donation_goal)
	return (
		<DonationCountWrapper>
			<div>
				Gespendet €{current_donation_count} ({percentage}% erreicht)
			</div>
			<div>Ziel €{donation_goal}</div>
			<div>Spender {donations_count}</div>
			<div>Läuft noch {donation_days_to_go} Tage</div>
		</DonationCountWrapper>
	)
}

export default DonationHeaderCount
