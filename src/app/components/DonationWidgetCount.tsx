import React, { useEffect, useState } from 'react'
import { styled } from '../../styles/Theme'
import { getPercentage } from '../utils/commonUtils'
import { GiChickenOven } from 'react-icons/gi'
import { formatMoneyWithSign } from '../utils/formatUtils'

interface DonationWidgetCountProps {
	current_amount: string
	donation_goal_amount: string
}

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

const MakeAWishLink = styled.a``

const DonationWidgetCount: React.FunctionComponent<DonationWidgetCountProps> = ({
	current_amount,
	donation_goal_amount,
}: DonationWidgetCountProps) => {
	const [hasReachedGoal, setHasReachGoal] = useState(false)
	const percentage = getPercentage(parseFloat(current_amount), parseFloat(donation_goal_amount))
	const absDiff = parseFloat(current_amount) - parseFloat(donation_goal_amount)

	useEffect(() => {
		if (percentage >= 100) {
			setHasReachGoal(true)
		} else {
			setHasReachGoal(false)
		}
	}, [current_amount])

	return (
		<React.Fragment>
			{hasReachedGoal && (
				<div style={{ padding: '0 18px 18px 18px', textAlign: 'center' }}>
					<GiChickenOven size={125} color={'#ffc439'} />
					<GoalReachedTitle>Winner Winner Chicken Dinner, Spendenziel erreicht!</GoalReachedTitle>
					<GoalReachedText>
						Die Spendendifferenz von <GoalReachCount>{formatMoneyWithSign(absDiff)}</GoalReachCount> wird an unerfüllte{' '}
						<MakeAWishLink target="_bank" rel="noreferrer" href={'https://www.make-a-wish.at/'}>
							Make-A-Wish
						</MakeAWishLink>{' '}
						Projekte gespendet.
					</GoalReachedText>
				</div>
			)}
		</React.Fragment>
	)
}

export default DonationWidgetCount
