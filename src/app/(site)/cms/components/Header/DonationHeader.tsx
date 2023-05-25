'use client'
import React, { ReactElement } from 'react'
import { RiTwitchFill } from 'react-icons/ri'
import { BsCalendar } from 'react-icons/bs'
import { Text } from '../Text'
import { BiDonateHeart } from 'react-icons/bi'
import { formatDate } from '../../../utils/formatUtils'
import { styled } from '../../../../../styles/Theme'

const StyledDonationHeaderTitle = styled.h2`
	font-size: ${(p) => p.theme.fontSize.l} px;
	margin-bottom: 4px;
	font-weight: normal;
`

const StyledDonationHeaderDescription = styled.div``

const StyledDonationHeaderDescriptionPrefix = styled.p`
	color: ${(p) => p.theme.color.charityTeal};
	margin-bottom: 2px;
`

const StyledDonationHeader = styled.div`
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

const DonationHeaderProject = styled.div<{ noMargin: boolean | undefined }>`
	display: flex;
	justify-content: space-between;
	margin-top: ${(p) => (p.noMargin ? '0' : p.theme.space.l)}px;

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

const DonationPageNavigation = styled.div`
	& > a {
		margin-right: 8px;
	}
`

interface DonationHeaderProps {
	title: string
	description: string
	children: ReactElement
	streamerName?: string
	streamLink?: string
	date?: string
	noMargin?: boolean
	streamerChannel: string
	wishes: string[]
}

const DonationHeader: React.FunctionComponent<DonationHeaderProps> = ({
	title,
	description,
	children,
	streamerName,
	streamLink,
	streamerChannel,
	date,
	noMargin,
	wishes,
}: DonationHeaderProps) => {
	return (
		<StyledDonationHeader>
			<DonationDescriptionGridArea>
				{streamerName && (
					<DonationHeaderProjectTitle>
						{streamerName}
						{`'`}s <Text content="donationProjectTitle" />
					</DonationHeaderProjectTitle>
				)}

				{streamLink && (
					<DonationHeaderStreamLink>
						<RiTwitchFill size={24} style={{ marginRight: '8px' }} />{' '}
						<a href={streamLink} rel="noreferrer" target="_blank">
							{/[^/]*$/.exec(streamLink)?.[0]}
						</a>
					</DonationHeaderStreamLink>
				)}

				{date && (
					<DonationHeaderStreamLink>
						<BsCalendar size={20} style={{ marginRight: '8px', marginLeft: '2px' }} />
						<span>{formatDate(new Date(date))}</span>
					</DonationHeaderStreamLink>
				)}

				{wishes && wishes.length > 1 && (
					<DonationHeaderStreamLink>
						<BiDonateHeart size={20} style={{ marginRight: '8px', marginLeft: '2px' }} />
						<DonationPageNavigation>
							{wishes.map((slug, i) => {
								return (
									<a
										href={`/donate/${streamerChannel}/${slug}`}
										key={`${slug}-${i}-link`}
										target="_blank"
										rel="noreferrer"
									>
										{slug}
									</a>
								)
							})}
						</DonationPageNavigation>
					</DonationHeaderStreamLink>
				)}

				<DonationHeaderProject noMargin={noMargin}>
					<DonationProjectContent>
						<StyledDonationHeaderTitle>{title}</StyledDonationHeaderTitle>
						<StyledDonationHeaderDescription>
							<StyledDonationHeaderDescriptionPrefix>
								<Text content="wishByHeartTitle" />
							</StyledDonationHeaderDescriptionPrefix>
							{description}
						</StyledDonationHeaderDescription>
					</DonationProjectContent>
				</DonationHeaderProject>
			</DonationDescriptionGridArea>
			<DonationWidgetGridArea>{children}</DonationWidgetGridArea>
		</StyledDonationHeader>
	)
}

export default DonationHeader
