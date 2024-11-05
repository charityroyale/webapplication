'use client'
import { NextPage } from 'next'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaDove } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import { makeAWishAPI } from '../../../../../config'
import {
	StyledDonationSumWidget,
	StyledDonatorsWidget,
	StyledLatestDonatorssWidget,
} from '../../../../../styles/common.styles'
import { CmsUpcomingStreamer, MakeAWishWish } from '../../../../cms/cms'
import { Text } from '../../../../cms/components/Text'
import DonationWidget from '../../../../cms/components/DonationWidget/DonationWidget'
import DonationWidgetCount from '../../../../cms/components/DonationWidget/DonationWidgetCount'
import DonationWidgetList, { DonationListItem } from '../../../../cms/components/DonationWidget/DonatorsWidgetList'
import DonationHeader from '../../../../cms/components/Header/DonationHeader'
import { MakeWishInfoJsonRecentDonationDTO, MakeAWishInfoJsonTopDonationDTO } from '../../../../dto/MakeAWishDTOs'
import { useMakeAWish } from '../../../../hooks/useMakeAWish'
import { IpInfoProviderContext } from '../../../../provider/IpInfoProvider'
import { useLanguageContext } from '../../../../provider/LanguageProvider'
import { hasProperty, getPercentage } from '../../../../utils/commonUtils'
import { formatMoneyWithSign, formatDate } from '../../../../utils/formatUtils'
import { ImTrophy } from 'react-icons/im'
import ProgressBar from './progress-bar'
import { isMultiStream } from '../../../../utils/streamerUtils'

export interface DonationPageProps {
	cms: {
		streamer: CmsUpcomingStreamer
		wish: MakeAWishWish
	}
}

export const DonatePageContent: NextPage<DonationPageProps> = ({ cms }: DonationPageProps) => {
	const [iFrameHeight, setIframeHeight] = useState('843px') // initial height by MAW form
	const [iFrameLoading, setIFrameLoaded] = useState(true)
	const [iFrameError, setIFrameError] = useState(false)
	const languageContext = useLanguageContext()
	const ipInfoContext = useContext(IpInfoProviderContext)
	const [shouldDisplayTaxHint, setShouldDisplayTaxHint] = useState(false)

	const { makeAWishData, makeAWishDataIsLoading, makeAWishDataIsError } = useMakeAWish()
	const isMakeAWishDataAvailable = !makeAWishDataIsError && !makeAWishDataIsLoading

	let mawWStreamerWishData
	let latestDonatorsList = new Array<DonationListItem>()
	let highestDonatorsList = new Array<DonationListItem>()

	// donation widget
	const donationGoal = cms.wish.donationGoal
	let donationSum = '0'
	let progressPercentage = 0
	let donatorsCount = '0'
	let wishCountry = ''

	const cmsStreamerSlug = cms.streamer.streamerChannel.toLocaleLowerCase()
	const cmsWishSlug = cms.wish.slug

	if (isMakeAWishDataAvailable) {
		// Check if streamer exists in MAW info json
		wishCountry = makeAWishData.wishes[cmsWishSlug].country
		if (hasProperty(makeAWishData.streamers, cmsStreamerSlug)) {
			const mawStreamerData = makeAWishData.streamers[cmsStreamerSlug]

			// Check if if wish has donations
			if (hasProperty(makeAWishData.wishes, cmsWishSlug)) {
				const mawWishData = makeAWishData.wishes[cmsWishSlug]

				if (!Array.isArray(mawStreamerData.wishes) && hasProperty(mawStreamerData.wishes, cmsWishSlug)) {
					mawWStreamerWishData = mawStreamerData.wishes[cmsWishSlug]
				}
				const isMultiStreamFlag = isMultiStream(cmsStreamerSlug)
				if (isMultiStreamFlag) {
					mawWStreamerWishData = makeAWishData.wishes[cmsWishSlug]
				}
				donationSum =
					mawStreamerData.type === 'main'
						? mawWishData.current_donation_sum_net
						: (mawWStreamerWishData?.current_donation_sum_net ?? '0')
				donatorsCount = mawWStreamerWishData?.current_donation_count.toLocaleString('de-DE') ?? '0'

				progressPercentage = getPercentage(parseFloat(donationSum), parseFloat(cms.wish.donationGoal) * 100)
			}

			latestDonatorsList = getLatestDonators(mawWStreamerWishData?.recent_donations ?? [])
			highestDonatorsList = getHighestDonatorsList(mawWStreamerWishData?.top_donors ?? [])
		}
	}

	useEffect(() => {
		const handler = (event: MessageEvent) => {
			const data = event.data
			if (hasProperty(data, 'frameHeight')) {
				setIframeHeight(`${data.frameHeight}px`)
			}
			if (hasProperty(data, 'command')) {
				// Scroll to center of iframe
				if (data.command == 'scrollIFrameCenter') {
					// It can be sure that the iframe is loaded after the rendering on the clientSide
					const iframe = document.getElementById('iframe') as HTMLIFrameElement
					const centerY = iframe.offsetTop + iframe.offsetHeight / 2
					const centerX = iframe.offsetLeft + iframe.offsetWidth / 2
					window.scrollTo(centerX - window.innerWidth / 2, centerY - window.innerHeight / 2)
				}
			}
		}
		window.addEventListener('message', handler)
		return () => window.removeEventListener('message', handler)
	}, [])

	const iFrameLoaded = useCallback(() => {
		setIFrameLoaded(false)
	}, [])

	const iFrameLoadedError = useCallback(() => {
		setIFrameError(true)
	}, [])

	useEffect(() => {
		if (wishCountry === 'DE' && ipInfoContext.country === 'AT') {
			setShouldDisplayTaxHint(true)
		}
	}, [wishCountry, ipInfoContext.country])

	return (
		<MainGrid>
			<DonationHeader
				streamLink={cms.streamer.streamLink}
				streamerName={cms.streamer.streamerName}
				title={cms.wish.tagline}
				description={cms.wish.descripion}
				date={cms.streamer.date}
				streamerChannel={cms.streamer.streamerChannel}
				wishes={cms.streamer.wishes}
			>
				<React.Fragment>
					<DonationStatsTitle>
						<Text content="donationOverViewText" />
					</DonationStatsTitle>
					<DonationSubPageStats>
						<div style={{ marginRight: '20px' }}>
							<FaDove color="white" size="40" />
						</div>

						<DonationStatsWidget>
							<p>
								<Text content="donationPrependText" />{' '}
								<DonationStatNumbers>{formatMoneyWithSign(donationSum)}</DonationStatNumbers>
							</p>
							<ProgressBar percent={progressPercentage} style={{ margin: '4px 0px' }} />
							<DonationStatsWidgetGoal>
								<Text content="donationGoal" />{' '}
								<DonationStatNumbers>{formatMoneyWithSign(donationGoal, true)}</DonationStatNumbers>
							</DonationStatsWidgetGoal>
						</DonationStatsWidget>
					</DonationSubPageStats>
					<DonationSubPageStats>
						<div style={{ marginRight: '20px' }}>
							<BsFillPeopleFill color="white" size="40" />
						</div>

						<DonationStatsWidget>
							<Text content="donatorNameText" />{' '}
							<DonationStatNumbers>{donatorsCount}</DonationStatNumbers>
						</DonationStatsWidget>
					</DonationSubPageStats>
				</React.Fragment>
			</DonationHeader>

			<DonationIFrameWrapper>
				<DonationFormHeader>
					<Text content="donationformTitle" />
				</DonationFormHeader>

				<TaxDeductionHint>{shouldDisplayTaxHint && <Text content="taxDeductionHint"></Text>}</TaxDeductionHint>

				{iFrameLoading && <Skeleton height={'843px'} />}
				{iFrameError && (
					<IFrameLoadErrorMessage>
						<Text content="donationFormLoadErrorText" />
					</IFrameLoadErrorMessage>
				)}
				<StyledDonationFormIframe
					height={iFrameLoading ? 0 : iFrameHeight}
					onLoad={iFrameLoaded}
					onError={iFrameLoadedError}
					id="iframe"
					src={`${
						languageContext.language === 'de'
							? makeAWishAPI.donationFormURL
							: makeAWishAPI.donationFormEnURL
					}${cms.streamer.streamerChannel.toLocaleLowerCase()}/${cms.wish.slug}`}
					title="Spendenformular"
				/>
			</DonationIFrameWrapper>

			<StyledDonationSumWidget>
				<DonationWidgetCount
					current_amount={mawWStreamerWishData ? mawWStreamerWishData.current_donation_sum_net : '0'}
					donation_goal_amount={mawWStreamerWishData ? cms.wish.donationGoal : '0'}
				/>
			</StyledDonationSumWidget>
			<StyledDonatorsWidget>
				<DonationWidget title={<Text content="topDonatorText" />}>
					<DonationWidgetList donationsList={highestDonatorsList} />
				</DonationWidget>
			</StyledDonatorsWidget>
			<StyledLatestDonatorssWidget>
				<DonationWidget title={<Text content="latestDonatorsTitle" />}>
					<DonationWidgetList donationsList={latestDonatorsList} />
				</DonationWidget>
			</StyledLatestDonatorssWidget>
		</MainGrid>
	)
}

const DonationIFrameWrapper = styled.div`
	grid-area: donation-form;
	color: ${(p) => p.theme.color.white};
`

const DonationFormHeader = styled.h2`
	font-size: ${(p) => p.theme.fontSize.xl}px;
	text-align: left;
	padding: ${(p) => p.theme.space.m}px 0px;
	font-weight: normal;
	color: ${(p) => p.theme.color.white};

	display: flex;
	align-items: flex-end;
`

const StyledDonationFormIframe = styled.iframe`
	width: 100%;
	border: none;
`

const IFrameLoadErrorMessage = styled.p`
	color: ${(p) => p.theme.color.white};
`

const TopPlaceMentItem = styled.div`
	display: flex;
	align-items: center;

	> svg {
		margin-bottom: 1px;
		margin-right: 4px;
	}
`

const getTopDonatorFirstColum = (placement: number) => {
	switch (placement) {
		case 0: {
			return (
				<TopPlaceMentItem>
					<ImTrophy color={'gold'} /> {placement + 1}. <Text content="topDonatorItemText" />
				</TopPlaceMentItem>
			)
		}
		case 1: {
			return (
				<TopPlaceMentItem>
					<ImTrophy color={'silver'} /> {placement + 1}. <Text content="topDonatorItemText" />
				</TopPlaceMentItem>
			)
		}
		case 2: {
			return (
				<TopPlaceMentItem>
					<ImTrophy color={'sandybrown'} /> {placement + 1}. <Text content="topDonatorItemText" />
				</TopPlaceMentItem>
			)
		}
		default: {
			return (
				<>
					{placement + 1}.
					<Text content="topDonatorItemText" />
				</>
			)
		}
	}
}

const getLatestDonators = (recentDonations: MakeWishInfoJsonRecentDonationDTO[]) => {
	let latestDonatorsList: DonationListItem[] = []

	latestDonatorsList = recentDonations.map((latestDonatorsDonation) => ({
		col_1: formatDate(new Date(latestDonatorsDonation.unix_timestamp * 1000)),
		col_2: latestDonatorsDonation.username,
		col_3: latestDonatorsDonation.amount_net,
	}))

	// Fill remaing slots
	while (latestDonatorsList.length < 10) {
		latestDonatorsList.push({
			col_1: <Text content="hereCouldYourNameTextPart1" />,
			col_2: <Text content="hereCouldYourNameTextPart2" />,
			col_3: '0,00',
		})
	}
	return latestDonatorsList
}

const getHighestDonatorsList = (topDonations: MakeAWishInfoJsonTopDonationDTO[]) => {
	let highestDonatorsList: DonationListItem[] = []
	highestDonatorsList = topDonations
		.filter((el) => el.username.toLowerCase() !== 'dhalucard community')
		.map((highestDonatorsDonation, i) => ({
			col_1: getTopDonatorFirstColum(i),
			col_2: highestDonatorsDonation.username,
			col_3: highestDonatorsDonation.amount_net,
		}))

	// Fill remaing slots
	while (highestDonatorsList.length < 10) {
		highestDonatorsList.push({
			col_1: <Text content="hereCouldYourNameTextPart1" />,
			col_2: <Text content="hereCouldYourNameTextPart2" />,
			col_3: '0,00',
		})
	}
	return highestDonatorsList
}

const TaxDeductionHint = styled.p`
	margin-bottom: ${(p) => p.theme.space.m}px;
`

const DonationSubPageStats = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 4px;

	${(p) => p.theme.media.phone} {
		width: 100%;
	}
`

const DonationStatsWidget = styled.div`
	flex-grow: 1;
`

const DonationStatsWidgetGoal = styled.p`
	text-align: right;
`

const DonationStatsTitle = styled.p`
	font-size: ${(p) => p.theme.fontSize.xl}px;
	margin-bottom: ${(p) => p.theme.space.m}px;
`

const DonationStatNumbers = styled.span`
	color: ${(p) => p.theme.color.charityTeal};
	font-weight: bold;
`

const MainGrid = styled.div`
	display: grid;
	grid-area: main;
	margin: auto;
	padding: 0 ${(p) => p.theme.space.xl}px;
	grid-gap: ${(p) => p.theme.gridGrap.desktop}px;
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
	grid-template-areas:
		'donation-header donation-header donation-header'
		'donation-form donation-form donation-widget-top-donation-sum'
		'donation-form donation-form donation-widget-top-donators'
		'donation-form donation-form donation-widget-top-latest-donators';

	${(p) => p.theme.media.tablet} {
		width: 100%;
		grid-template-columns: 1fr 1fr;
		padding: ${(p) => p.theme.space.l}px ${(p) => p.theme.space.m}px;
		grid-template-areas:
			'donation-header donation-header'
			'donation-form donation-form'
			'donation-widget-top-donation-sum donation-widget-top-donators'
			'donation-widget-top-latest-donators donation-widget-top-latest-donators';
	}

	${(p) => p.theme.media.phone} {
		width: 100%;
		grid-template-columns: 1fr;
		padding: 0 ${(p) => p.theme.space.xl}px;
		grid-template-areas:
			'donation-header'
			'donation-form'
			'donation-widget-top-donation-sum'
			'donation-widget-top-donators'
			'donation-widget-top-latest-donators';
	}
`
