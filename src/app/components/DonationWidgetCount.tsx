import React, { useEffect, useState } from 'react'
import { styled } from '../../styles/Theme'
import { Circle } from 'rc-progress'
import { getPercentage } from '../utils/commonUtils'

interface DonationWidgetCountProps {
	current_amount: string
	donation_goal_amount: string
}

const CurrentAmountDisplay = styled.div`
	font-size: ${(p) => p.theme.fontSize.xl}px;
	text-align: center;
	font-weight: bold;
	position: absolute;
	width: 100%;
	top: 40%;
	left: 50%;
	transform: translate(-50%);
	color: ${(p) => p.theme.color.white};
`
const GoalAmountDisplay = styled.div`
	font-size: ${(p) => p.theme.fontSize.xl}px;
	text-align: center;
	font-weight: bold;
	position: absolute;
	width: 100%;
	top: 50%;
	left: 50%;
	transform: translate(-50%);
	color: ${(p) => p.theme.color.white};
`

const GoalReachedTitle = styled.p`
	text-align: center;
	color: ${(p) => p.theme.color.white};
	font-weight: 500;
	margin: 18px 0;
`

const GoalReachedText = styled.p`
	color: ${(p) => p.theme.color.white};
`

const GoalReachCount = styled.span`
	font-weight: bold;
	color: #50c878;
`

const MakeAWishLink = styled.a`
	color: ${(p) => p.theme.color.white};
`

const DonationWidgetCount: React.FunctionComponent<DonationWidgetCountProps> = ({
	current_amount,
	donation_goal_amount,
}: DonationWidgetCountProps) => {
	const [hasReachedGoal, setHasReachGoal] = useState(false)
	const percentage = getPercentage(parseFloat(current_amount), parseFloat(donation_goal_amount))
	const absDiff = parseFloat((parseFloat(current_amount) - parseFloat(donation_goal_amount)).toFixed(2)).toFixed(2)

	useEffect(() => {
		if (percentage >= 100) {
			setHasReachGoal(true)
		} else {
			setHasReachGoal(false)
		}
	}, [current_amount])

	return (
		<React.Fragment>
			<div style={{ position: 'relative' }}>
				<CurrentAmountDisplay>
					<div>Stand: {current_amount} €</div>
				</CurrentAmountDisplay>
				<GoalAmountDisplay>
					<div>Ziel: {donation_goal_amount} €</div>
				</GoalAmountDisplay>
				<Circle
					percent={hasReachedGoal ? 100 : percentage}
					gapDegree={45}
					gapPosition="top"
					strokeWidth={6}
					trailWidth={6}
					strokeLinecap="round"
					style={{ transform: 'rotateY(180deg)' }}
					strokeColor={hasReachedGoal ? '#50C878' : '#231565'}
				/>
			</div>
			{hasReachedGoal && (
				<div>
					<GoalReachedTitle>Winner Winner Chicken Dinner, Spendenziel erreicht!</GoalReachedTitle>
					<GoalReachedText>
						Die Spendendifferenz von <GoalReachCount>{absDiff} €</GoalReachCount> wird an unerfüllte{' '}
						<MakeAWishLink href={'https://www.make-a-wish.at/'}>make-a-wish.at</MakeAWishLink> Projekte gespendet.
					</GoalReachedText>
				</div>
			)}
		</React.Fragment>
	)
}

export default DonationWidgetCount
