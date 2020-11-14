import React from 'react'
import { styled } from '../../styles/Theme'

interface DonationHeaderProps {
	title: string
	description: string
}

const StyledDonationHeaderTitle = styled.h5`
	background-color: ${(p) => p.theme.color.veniPurple};
	color: ${(p) => p.theme.color.white};
	font-size: ${(p) => p.theme.fontSize.xl}px;
	padding: ${(p) => p.theme.space.m}px 0px;
`

const StyledDonationHeaderDescription = styled.div`
	color: ${(p) => p.theme.color.black};
	padding: ${(p) => p.theme.space.l}px ${(p) => p.theme.space.m}px;
`

export const StyledDonationHeader = styled.div`
	grid-area: donation-header;
	background-color: ${(p) => p.theme.color.white};
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
