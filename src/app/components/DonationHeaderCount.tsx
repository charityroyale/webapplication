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
	background-color: ${(p) => p.theme.color.veniPurple};
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

const DonationCountBox = styled.div`
	text-align: left;
`

const DonationCountCol = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: ${(p) => p.theme.space.m}px;

	${DonationCountBox}:not(:last-child) {
		margin-bottom: ${(p) => p.theme.space.m}px;
	}
`

const DonationHeaderCount: React.FunctionComponent<DonationHeaderCountProps> = ({
	donation_goal,
	current_donation_count,
	donations_count,
}: DonationHeaderCountProps) => {
	const percentage = getPercentage(current_donation_count, donation_goal).toFixed(2)
	return (
		<DonationCountWrapper>
			<DonationCountCol style={{ marginRight: '12px' }}>
				<DonationCountBox>
					<DonationLabel>Gespendet</DonationLabel>
					<DonationUnit>€{current_donation_count.toLocaleString('de-DE')}</DonationUnit>
				</DonationCountBox>
				<DonationCountBox>
					<DonationLabel>Ziel</DonationLabel>
					<DonationUnit>€{donation_goal.toLocaleString('de-DE')}</DonationUnit>
				</DonationCountBox>
			</DonationCountCol>

			<DonationCountCol>
				<DonationCountBox>
					<DonationLabel>Spender</DonationLabel>
					<DonationUnit>{donations_count}</DonationUnit>
				</DonationCountBox>
				<DonationCountBox>
					<DonationLabel>Erreicht </DonationLabel>
					<DonationUnit>{percentage}%</DonationUnit>
				</DonationCountBox>
			</DonationCountCol>
		</DonationCountWrapper>
	)
}

export default DonationHeaderCount
