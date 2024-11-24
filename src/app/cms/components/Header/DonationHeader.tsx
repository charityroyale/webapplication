'use client'
import React, { ReactElement } from 'react'
import { RiTwitchFill } from 'react-icons/ri'
import { BsCalendar } from 'react-icons/bs'
import { Text } from '../Text'
import { formatDate } from '../../../utils/formatUtils'
import { styled } from 'styled-components'
import { MakeAWishWishStreamerDTO } from '../../../dto/MakeAWishDTOs'

const StyledDonationHeaderTitle = styled.h2`
	font-size: ${(p) => p.theme.fontSize.l} px;
	margin-bottom: 4px;
	font-weight: normal;
`

const StyledDonationHeaderDescription = styled.div``

const StyledDonationHeaderDescriptionPrefix = styled.p`
	color: ${(p) => p.theme.color.charityTeal};
	margin-bottom: 12px;
`

const StyledStreamerContributors = styled.p`
	color: ${(p) => p.theme.color.charityTeal};
	margin-bottom: 2px;
	margin-top: 12px;
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

const DonationPageNavigationWrapper = styled.h2`
	font-size: ${(p) => p.theme.fontSize.l}px;
	font-weight: normal;
	margin-bottom: 4px;
	margin-top: 16px;
`

const DonationHeaderProjectTitle = styled.h2`
	font-size: ${(p) => p.theme.fontSize.xl}px;
	font-weight: normal;
	margin-bottom: 4px;
`

const DonationSubHeaderProjectTitle = styled.h2`
	font-size: ${(p) => p.theme.fontSize.xl}px;
	font-weight: normal;
	margin-bottom: 4px;
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

const DonationHeaderStreamLink = styled.div`
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
		display: inline-block;
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
	streamers:
		| []
		| {
				[streamerSlug: string]: MakeAWishWishStreamerDTO
		  }
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
	streamers,
}: DonationHeaderProps) => {
	const streamerContributions = Object.keys(streamers)
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

				{streamerName && wishes && wishes.length > 1 && (
					<DonationPageNavigationWrapper>
						<DonationSubHeaderProjectTitle>
							<Text content="donationProjectNavigationTitle" />
						</DonationSubHeaderProjectTitle>
						<DonationPageNavigation>
							{wishes.map((slug, i) => {
								return (
									<a
										href={`/${streamerChannel}/${slug}`}
										key={`${slug}-${i}-link`}
										target="_blank"
										rel="noreferrer"
									>
										{slug}
									</a>
								)
							})}
						</DonationPageNavigation>
					</DonationPageNavigationWrapper>
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
						{streamerContributions.length > 1 && (
							<div>
								<StyledStreamerContributors>
									<Text content="streamerContributionText" />
								</StyledStreamerContributors>
								<p>{Object.keys(streamers).join(', ')}</p>
							</div>
						)}
					</DonationProjectContent>
				</DonationHeaderProject>
			</DonationDescriptionGridArea>
			<DonationWidgetGridArea>{children}</DonationWidgetGridArea>
		</StyledDonationHeader>
	)
}

export default DonationHeader
