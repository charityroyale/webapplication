import React, { useEffect, useState } from 'react'
import { GiChickenOven } from 'react-icons/gi'
import { Text } from '../Text'
import { styled } from 'styled-components'
import { getPercentage } from '../../../utils/commonUtils'
import { formatMoneyWithSign } from '../../../utils/formatUtils'

const GoalReachedTitle = styled.p`
	text-align: center;
	color: ${(p) => p.theme.color.white};
	font-weight: 500;
	margin: ${(p) => p.theme.space.m}px 0;
`

const GoalReachedText = styled.p`
	color: ${(p) => p.theme.color.white};
`

const GoalReachCount = styled.span`
	font-weight: bold;
	color: #50c878;
`

interface DonationWidgetCountProps {
	current_amount: string
	donation_goal_amount: string
}

const DonationWidgetCount: React.FunctionComponent<DonationWidgetCountProps> = ({
	current_amount,
	donation_goal_amount,
}: DonationWidgetCountProps) => {
	const [hasReachedGoal, setHasReachGoal] = useState(false)
	const percentage = getPercentage(parseFloat(current_amount), parseFloat(donation_goal_amount) * 100)
	const absDiff = parseFloat(current_amount) - parseFloat(donation_goal_amount) * 100

	useEffect(() => {
		if (percentage >= 100) {
			setHasReachGoal(true)
		} else {
			setHasReachGoal(false)
		}
	}, [percentage])

	return (
		<React.Fragment>
			{hasReachedGoal && (
				<div style={{ padding: '0 18px 18px 18px', textAlign: 'center' }}>
					<GiChickenOven size={125} color={'#ffc439'} />
					<GoalReachedTitle>
						<Text content="donationWidgetGoalReachedTitle" />
					</GoalReachedTitle>
					<GoalReachedText>
						<Text content="donationWidgetGoalReachedTextPart1" />{' '}
						<GoalReachCount>{formatMoneyWithSign(absDiff)}</GoalReachCount>{' '}
						<Text content="donationWidgetGoalReachedTextPart2" />{' '}
						<a target="_bank" rel="noreferrer" href={'https://www.make-a-wish.at/'}>
							Make-A-Wish
						</a>{' '}
						<Text content="donationWidgetGoalReachedTextPart3" />
					</GoalReachedText>
				</div>
			)}
		</React.Fragment>
	)
}

export default DonationWidgetCount
