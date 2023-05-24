import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { Head } from 'next/document'
import { Line } from 'rc-progress'
import React, { useCallback, useEffect, useState, useContext } from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaDove } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import { CmsUpcomingStreamer, MakeAWishWish, cmsStreamerWishes, cmsDonationPagePaths } from '../(site)/cms/cms'
import DonationWidget from '../(site)/cms/components/DonationWidget/DonationWidget'
import DonationWidgetCount from '../(site)/cms/components/DonationWidget/DonationWidgetCount'
import DonationWidgetList, { DonationListItem } from '../(site)/cms/components/DonationWidget/DonatorsWidgetList'
import DonationHeader from '../(site)/cms/components/Header/DonationHeader'
import { MakeWishInfoJsonRecentDonationDTO, MakeAWishInfoJsonTopDonationDTO } from '../(site)/dto/MakeAWishDTOs'
import { useIsSSR } from '../(site)/hooks/useIsSSR'
import { useMakeAWish } from '../(site)/hooks/useMakeAWish'
import DonationLayout from '../(site)/layouts/DonationLayout'
import { IpInfoProviderContext } from '../(site)/provider/IpInfoProvider'
import { LanguageContext } from '../(site)/provider/LanguageProvider'
import PageWithLayoutType from '../(site)/types/PageWithLayout'
import { hasProperty, getPercentage } from '../(site)/utils/commonUtils'
import { formatMoneyWithSign, formatDate } from '../(site)/utils/formatUtils'
import { makeAWishAPI } from '../../config'
import { StyledDonationSumWidget, StyledDonatorsWidget, StyledLatestDonatorssWidget } from '../../styles/common.styles'

export interface DonationPageProps {
	cms: {
		streamer: CmsUpcomingStreamer
		wish: MakeAWishWish
	}
}

const DonatePage: NextPage<DonationPageProps> = ({ cms }: DonationPageProps) => {
	const [iFrameHeight, setIframeHeight] = useState('843px') // initial height by MAW form
	const [iFrameLoading, setIFrameLoaded] = useState(true)
	const [iFrameError, setIFrameError] = useState(false)
	const isSSR = useIsSSR()
	const languageContext = useContext(LanguageContext)
	const [hasReachedGoal, setHasReachGoal] = useState(false)
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
	let cmsStreamerSlug =
		cms.streamer.streamerChannel.toLocaleLowerCase() === 'krokoboss'
			? 'shredmir'
			: cms.streamer.streamerChannel.toLocaleLowerCase()
	cmsStreamerSlug = cmsStreamerSlug === 'ichbinzarbex' ? 'filow' : cmsStreamerSlug
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
					donationSum =
						mawStreamerData.type === 'main'
							? mawWishData.current_donation_sum_net
							: mawWStreamerWishData.current_donation_sum_net
					donatorsCount = mawWStreamerWishData.current_donation_count.toLocaleString('de-DE')
					progressPercentage = getPercentage(
						parseFloat(mawWStreamerWishData.current_donation_sum_net),
						parseFloat(cms.wish.donationGoal)
					)
				}
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
		if (progressPercentage >= 100) {
			setHasReachGoal(true)
		} else {
			setHasReachGoal(false)
		}
	}, [progressPercentage])

	useEffect(() => {
		if (wishCountry === 'DE' && ipInfoContext.country === 'AT') {
			setShouldDisplayTaxHint(true)
		}
	}, [wishCountry, ipInfoContext.country])
	return (
		<React.Fragment>
			<Head>
				<title>Charity Royale - {cms.streamer.streamerName}</title>
				<link
					rel="preload"
					as="document"
					href={`${makeAWishAPI.donationFormURL}${cmsStreamerSlug}/${cms.wish.slug}`}
				></link>
				<link
					rel="preload"
					as="script"
					href="https://www.paypal.com/sdk/js?client-id=ARva2JSJxkYe3aON0p68XxuHWEw-HaEqajH0a990PelhZZGnFh04CUOQpOgWURnRZqVdcQAo9tfFLUl_&currency=EUR"
				></link>

				<meta name="twitter:card" content="summary" key="twcard" />
				<meta name="twitter:site" content={'@CharityRoyale'} key="twsite" />
				<meta name="twitter:creator" content={'@CharityRoyale'} key="twcreator" />

				<meta property="og:url" content={'https://charityroyale.at/'} key="ogurl" />
				<meta
					property="og:image"
					content={'https://charityroyale.at/uploads/charity_royale_rgb_300x300.png'}
					key="ogimage"
				/>
				<meta property="og:image:width" content={'300'} key="ogimagewidth" />
				<meta property="og:image:height" content={'300'} key="ogimageheight" />
				<meta property="og:site_name" content={'Charity Royale'} key="ogsitename" />
				<meta
					property="og:title"
					content={`${cms.streamer.streamerName}'s Spendenseite`}
					key="ogtitlestreamer"
				/>
				<meta property="og:type" content={'website'} key="ogtype" />
				<meta property="og:locale" content={'de_AT'} key="oglocale" />
				<meta property="fb:app_id" content={process.env.FB_ID} key="fbappid" />
				<meta
					property="og:description"
					content={'Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.'}
					key="ogdesc"
				/>
			</Head>

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
							<Line
								style={{ padding: '4px 0' }}
								percent={progressPercentage}
								strokeWidth={4}
								trailWidth={4}
								trailColor="white"
								strokeColor={hasReachedGoal && !makeAWishDataIsLoading ? 'green' : 'gold'}
							/>
							<DonationStatsWidgetGoal>
								<Text content="donationGoal" />{' '}
								<DonationStatNumbers>{formatMoneyWithSign(donationGoal)}</DonationStatNumbers>
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
				{!isSSR && (
					<StyledDonationFormIframe
						height={iFrameLoading ? 0 : iFrameHeight}
						onLoad={iFrameLoaded}
						onError={iFrameLoadedError}
						id="iframe"
						src={`${
							languageContext.language === 'de'
								? makeAWishAPI.donationFormURL
								: makeAWishAPI.donationFormEnURL
						}${cmsStreamerSlug}/${cms.wish.slug}`}
						title="Spendenformular"
					/>
				)}
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
		</React.Fragment>
	)
}

export const getStaticProps: GetStaticProps<DonationPageProps> = async ({ params }) => {
	// This function is not called on the client and would fail at build-time
	// params are passed by `cmsDonationPagePaths` in `cms.ts`.

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const streamerSlug = params!.streamer as string
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const wishSlug = params!.wishSlug as string

	const donationPageKey = streamerSlug + wishSlug

	return {
		props: {
			cms: {
				...cmsStreamerWishes[donationPageKey],
			},
		},
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: cmsDonationPagePaths,
		fallback: false,
	}
}
;(DonatePage as unknown as PageWithLayoutType).layout = DonationLayout

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
	highestDonatorsList = topDonations.map((highestDonatorsDonation, i) => ({
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
	margin-top: -5px;
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

export default DonatePage
