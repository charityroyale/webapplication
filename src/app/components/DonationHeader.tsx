import React from 'react'
import { styled } from '../../styles/Theme'

interface DonationHeaderProps {
	title: string
	description: string
}

const StyledDonationHeaderTitle = styled.h2`
	font-size: ${(p) => p.theme.fontSize.xl}px;
	margin-bottom: ${(p) => p.theme.space.l}px;
`

const StyledDonationHeaderDescription = styled.div``

export const StyledDonationHeader = styled.div`
	grid-area: donation-header;
	color: ${(p) => p.theme.color.white};
	padding: ${(p) => p.theme.space.l}px ${(p) => p.theme.space.m}px;
	border: 2px solid ${(p) => p.theme.color.royaleGold};
`

const DonationHeader: React.FunctionComponent<DonationHeaderProps> = ({ title, description }: DonationHeaderProps) => {
	return (
		<StyledDonationHeader>
			<StyledDonationHeaderTitle>{title}</StyledDonationHeaderTitle>
			<StyledDonationHeaderDescription>{description}</StyledDonationHeaderDescription>
		</StyledDonationHeader>
	)
}

export default DonationHeader
