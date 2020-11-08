import React from 'react'
import { StyledDonationHeader } from '../../styles/common.styles'
import { styled } from '../../styles/Theme'

interface DonationHeaderProps {
	title: string
	description: string
}

const StyledDonationHeaderTitle = styled.h5`
	background-color: ${(p) => p.theme.color.willhaben};
	color: ${(p) => p.theme.color.white};
	font-size: ${(p) => p.theme.fontSize.xl}px;
	padding: ${(p) => p.theme.space.m}px ${(p) => p.theme.space.l}px;
	border-top-right-radius: ${(p) => p.theme.space.xs}px;
	border-top-left-radius: ${(p) => p.theme.space.xs}px;
`

const StyledDonationHeaderDescription = styled.div`
	color: ${(p) => p.theme.color.black};
	padding: ${(p) => p.theme.space.l}px ${(p) => p.theme.space.m}px;
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
