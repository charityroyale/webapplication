import React, { ReactElement } from 'react'
import { styled } from '../../styles/Theme'
import { RiTwitchFill } from 'react-icons/ri'

interface DonationHeaderProps {
	streamerName: string
	title: string
	description: string
	children: ReactElement
	streamLink: string
}

const StyledDonationHeaderTitle = styled.h2`
	font-size: ${(p) => p.theme.fontSize.l} px;
	margin-bottom: 4px;
	font-weight: normal;
`

const StyledDonationHeaderDescription = styled.div``

export const StyledDonationHeader = styled.div`
	grid-area: donation-header;
	display: grid;
	justify-content: space-between;
	grid-template-areas: 'project-description project-description  project-widget';
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
	color: ${(p) => p.theme.color.white};

	${(p) => p.theme.media.phone} {
		grid-template-areas:
			'project-description project-description  project-description'
			'project-widget project-widget project-widget';
		grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
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

const DonationHeaderProject = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: ${(p) => p.theme.space.l}px;

	${(p) => p.theme.media.phone} {
		flex-direction: column;
	}
`

const DonationHeaderProjectTitle = styled.h2`
	font-size: ${(p) => p.theme.fontSize.xl}px;
	font-weight: normal;
`

const DonationDescriptionGridArea = styled.div`
	grid-area: project-description;
`

const DonationWidgetGridArea = styled.div`
	grid-area: project-widget;

	${(p) => p.theme.media.phone} {
		margin-top: ${(p) => p.theme.space.xxl}px;
	}
`

const DonationHeaderStreamLink = styled.p`
	display: flex;
	align-items: center;
	margin: 8px 0;

	a {
		color: ${(p) => p.theme.color.charityTeal};
	}
`

const DonationHeader: React.FunctionComponent<DonationHeaderProps> = ({
	title,
	description,
	children,
	streamerName,
	streamLink,
}: DonationHeaderProps) => {
	return (
		<StyledDonationHeader>
			<DonationDescriptionGridArea>
				<DonationHeaderProjectTitle>
					{streamerName}
					{`'`}s Spendenprojekt
				</DonationHeaderProjectTitle>
				<DonationHeaderStreamLink>
					<RiTwitchFill size={24} style={{ marginRight: '8px' }} />{' '}
					<a href={streamLink} rel="noreferrer" target="_blank">
						twitch.tv/{streamerName.toLowerCase()}
					</a>
				</DonationHeaderStreamLink>
				<DonationHeaderProject>
					<DonationProjectContent>
						<StyledDonationHeaderTitle>{title}</StyledDonationHeaderTitle>
						<StyledDonationHeaderDescription>{description}</StyledDonationHeaderDescription>
					</DonationProjectContent>
				</DonationHeaderProject>
			</DonationDescriptionGridArea>
			<DonationWidgetGridArea>{children}</DonationWidgetGridArea>
		</StyledDonationHeader>
	)
}

export default DonationHeader
