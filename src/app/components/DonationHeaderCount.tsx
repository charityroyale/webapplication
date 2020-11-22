import React from 'react'
import { getPercentage } from '../utils/commonUtils'
import { styled } from '../../styles/Theme'

interface DonationHeaderCountProps {
	donation_goal: number
	current_donation_count: number
	donations_count: number
}

const DonationCountWrapper = styled.div`
	display: flex;
	justify-content: center;
	font-size: ${(p) => p.theme.fontSize.l}px;
	font-weight: bold;
	color: ${(p) => p.theme.color.white};

	${(p) => p.theme.media.phone} {
		margin-right: 0;
	}
`

const DonationLabel = styled.div`
	font-size: ${(p) => p.theme.fontSize.m}px;
`

const DonationUnit = styled.div`
	font-size: ${(p) => p.theme.fontSize.xl}px;
`

const StyledDonationCountBox = styled.div`
	text-align: left;
`

const DonationCountCol = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: ${(p) => p.theme.space.m}px;

	${StyledDonationCountBox}:not(:last-child) {
		margin-bottom: ${(p) => p.theme.space.m}px;
	}
`

interface DonationCountBoxProps {
	title: string
	text: string
}

export const DonationCountBox: React.FunctionComponent<DonationCountBoxProps> = ({
	title,
	text,
}: DonationCountBoxProps) => {
	return (
		<StyledDonationCountBox>
			<DonationLabel>{title}</DonationLabel>
			<DonationUnit>{text}</DonationUnit>
		</StyledDonationCountBox>
	)
}

const DonationHeaderCount: React.FunctionComponent<DonationHeaderCountProps> = ({
	donation_goal,
	current_donation_count,
	donations_count,
}: DonationHeaderCountProps) => {
	const percentage = getPercentage(current_donation_count, donation_goal).toFixed(2)
	return (
		<DonationCountWrapper>
			<DonationCountCol style={{ marginRight: '12px' }}>
				<DonationCountBox title={'Gespendet'} text={`€${current_donation_count.toLocaleString('de-DE')}`} />
				<DonationCountBox title={'Ziel'} text={`€${donation_goal.toLocaleString('de-DE')}`} />
			</DonationCountCol>

			<DonationCountCol>
				<DonationCountBox title={'Spender'} text={donations_count.toString()} />
				<DonationCountBox title={'Erreicht'} text={`${percentage}%`} />
			</DonationCountCol>
		</DonationCountWrapper>
	)
}

export default DonationHeaderCount
