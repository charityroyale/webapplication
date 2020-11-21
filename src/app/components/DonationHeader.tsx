import React, { ReactElement } from 'react'
import { styled } from '../../styles/Theme'

interface DonationHeaderProps {
	title: string
	description: string
	children: ReactElement
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
	display: flex;
	justify-content: space-between;

	${(p) => p.theme.media.phone} {
		flex-direction: column;
	}
`

const DonationProjectContent = styled.div`
	margin-right: 0;

	${(p) => p.theme.media.tablet} {
		margin-right: ${(p) => p.theme.space.m}px;
	}

	${(p) => p.theme.media.desktop} {
		margin-right: ${(p) => p.theme.space.m}px;
	}
`

const DonationHeader: React.FunctionComponent<DonationHeaderProps> = ({
	title,
	description,
	children,
}: DonationHeaderProps) => {
	return (
		<StyledDonationHeader>
			<DonationProjectContent>
				<StyledDonationHeaderTitle>{title}</StyledDonationHeaderTitle>
				<StyledDonationHeaderDescription>{description}</StyledDonationHeaderDescription>
			</DonationProjectContent>

			<div>{children}</div>
		</StyledDonationHeader>
	)
}

export default DonationHeader
