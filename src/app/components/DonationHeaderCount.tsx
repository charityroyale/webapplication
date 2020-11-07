import React from 'react'
import { Line } from 'rc-progress'
import { getPercentage } from '../utils/commonUtils'

interface DonationHeaderCountProps {
	donation_goal: number
	current_donation_count: number
	donations_count: number
	donation_days_to_go: number
}

const DonationHeaderCount: React.FunctionComponent<DonationHeaderCountProps> = ({
	donation_goal,
	current_donation_count,
	donations_count,
	donation_days_to_go,
}: DonationHeaderCountProps) => {
	const percentage = getPercentage(current_donation_count, donation_goal)
	return (
		<div>
			<div>{current_donation_count} €</div>
			<Line style={{ width: '100%' }} trailColor={'white'} strokeWidth={6} trailWidth={6} percent={percentage}></Line>
		</div>
	)
}

export default DonationHeaderCount
