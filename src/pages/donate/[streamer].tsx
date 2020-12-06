import React, { useCallback, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import DonationHeader from '../../app/components/DonationHeader'
import DonationWidget from '../../app/components/DonationWidget/DonationWidget'
import { StyledDonationSumWidget, StyledDonatorsWidget, StyledLatestDonatorssWidget } from '../../styles/common.styles'
import DonationLayout from '../../app/layouts/DonationLayout'
import PageWithLayoutType from '../../app/types/PageWithLayout'
import { makeAWishAPI } from '../../config'
import useMakeAWish from '../../app/hooks/useMakeAWish'
import { MakeWishDonationProjectDTO } from '../../app/dto/MakeAWishDonationsDTO'
import { formatDateDefault, formatMoneyWithSign } from '../../app/utils/formatUtils'
import { styled } from '../../styles/Theme'
import Skeleton from 'react-loading-skeleton'
import { useIsSSR } from '../../app/hooks/useIsSSR'
import { ImTrophy } from 'react-icons/im'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaDove } from 'react-icons/fa'
import { Line } from 'rc-progress'
import { getPercentage } from '../../app/utils/commonUtils'
import cmsContent, { Upcoming } from '../../app/cms/cms'
import DonationWidgetCount from '../../app/components/DonationWidget/DonationWidgetCount'
import DonationWidgetList, { List } from '../../app/components/DonationWidget/DonatorsWidgetList'

const DonationIFrameWrapper = styled.div`
	grid-area: donation-form;
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

interface InitialDonationProps {
	project: Upcoming
}

const getTopDonatorFirstColum = (index) => {
	switch (index) {
		case 0: {
			return (
				<TopPlaceMentItem>
					<ImTrophy color={'gold'} /> {index + 1}. Top-Spender
				</TopPlaceMentItem>
			)
		}
		case 1: {
			return (
				<TopPlaceMentItem>
					<ImTrophy color={'silver'} /> {index + 1}. Top-Spender
				</TopPlaceMentItem>
			)
		}
		case 2: {
			return (
				<TopPlaceMentItem>
					<ImTrophy color={'sandybrown'} /> {index + 1}. Top-Spender
				</TopPlaceMentItem>
			)
		}
		default: {
			return `${index + 1}. Top-Spender`
		}
	}
}

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

const DonatePage: NextPage<InitialDonationProps> = ({ project }: InitialDonationProps) => {
	const router = useRouter()
	const [iFrameHeight, setIframeHeight] = useState('843px') // initial height by form
	const [iFrameLoading, setIFrameLoaded] = useState(true)
	const [iFrameError, setIFrameError] = useState(false)
	const isSSR = useIsSSR()
	const { streamer } = router.query

	const [hasReachedGoal, setHasReachGoal] = useState(false)

	const makeAWish = useMakeAWish()
	let makeAWishProject: MakeWishDonationProjectDTO
	let latestDonatorsList = new Array<List>()
	let highestDonatorsList = new Array<List>()
	const isMakeAWishDataAvailable = !makeAWish.isError && !makeAWish.isLoading
	if (isMakeAWishDataAvailable) {
		makeAWishProject = makeAWish.data.projects[project.makeAWish.makeAWishProjectId]
		latestDonatorsList = makeAWishProject.recent_donators.map((r) => ({
			col_1: formatDateDefault(new Date(r.unix_timestamp * 1000)),
			col_2: r.name,
			col_3: r.amount,
		}))

		while (latestDonatorsList.length < 10) {
			latestDonatorsList.push({
				col_1: 'Hier könnte',
				col_2: 'dein Name stehen',
				col_3: '0,00',
			})
		}

		highestDonatorsList = makeAWishProject.top_donators.map((r, i) => ({
			col_1: getTopDonatorFirstColum(i),
			col_2: r.name,
			col_3: r.amount,
		}))

		while (highestDonatorsList.length < 10) {
			highestDonatorsList.push({
				col_1: 'Hier könnte',
				col_2: 'dein Name stehen',
				col_3: '0,00',
			})
		}
	}

	useEffect(() => {
		const handler = (event) => {
			const data = event.data
			if (data.hasOwnProperty('frameHeight')) {
				setIframeHeight(`${data.frameHeight}px`)
			}
			if (data.hasOwnProperty('command')) {
				if (data.command == 'scrollIFrameCenter') {
					// Scroll to center of iframe
					const iframe = document.getElementById('iframe')
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

	let donationSum = '0'
	let donationGoal = '0'
	let percentage = 0
	let donatorsCount = '0'

	if (isMakeAWishDataAvailable) {
		donationSum = makeAWishProject.current_donation_sum
		donationGoal = makeAWishProject.donation_goal
		donatorsCount = makeAWishProject.current_donation_count.toLocaleString('de-DE')
		percentage = getPercentage(
			parseFloat(makeAWishProject.current_donation_sum),
			parseFloat(makeAWishProject.donation_goal)
		)
	}

	useEffect(() => {
		if (percentage >= 100) {
			setHasReachGoal(true)
		} else {
			setHasReachGoal(false)
		}
	}, [])

	return (
		<React.Fragment>
			<Head>
				<title>Charity Royale 2020 - {project.streamerName}</title>
				<link rel="preload" as="document" href={`${makeAWishAPI.donationFormURL}${project.makeAWishProjectId}`}></link>
				<link
					rel="preload"
					as="script"
					href="https://www.paypal.com/sdk/js?client-id=ATL90eAe-2zLX8e1YYlyI_O6-gd_6qs9gBTimJ7hNiOa1ZUKNNs0XBy1MuF2vb_tY709L13K9akFjhWs&currency=EUR"
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
				<meta property="og:site_name" content={'Charity Royale 2020'} key="ogsitename" />
				<meta property="og:title" content={`${project.streamerName}'s Spendenseite`} key="ogtitlestreamer" />
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
				streamLink={project.streamLink}
				streamerName={project.streamerName}
				title={project.makeAWish.tagline}
				description={project.makeAWish.descripion}
				date={project.date}
			>
				<React.Fragment>
					<DonationStatsTitle>Spendenübersicht</DonationStatsTitle>
					<DonationSubPageStats>
						<div style={{ marginRight: '20px' }}>
							<FaDove color="white" size="40" />
						</div>

						<DonationStatsWidget>
							<p>
								Gespendet <DonationStatNumbers>{formatMoneyWithSign(donationSum)}</DonationStatNumbers>
							</p>
							<Line
								style={{ padding: '4px 0' }}
								percent={percentage}
								strokeWidth={4}
								trailWidth={4}
								trailColor="white"
								strokeColor={hasReachedGoal && !makeAWish.isLoading ? 'green' : 'gold'}
							/>
							<DonationStatsWidgetGoal>
								Ziel <DonationStatNumbers>{formatMoneyWithSign(donationGoal)}</DonationStatNumbers>
							</DonationStatsWidgetGoal>
						</DonationStatsWidget>
					</DonationSubPageStats>
					<DonationSubPageStats>
						<div style={{ marginRight: '20px' }}>
							<BsFillPeopleFill color="white" size="40" />
						</div>

						<DonationStatsWidget>
							Spender <DonationStatNumbers>{donatorsCount}</DonationStatNumbers>
						</DonationStatsWidget>
					</DonationSubPageStats>
				</React.Fragment>
			</DonationHeader>

			<DonationIFrameWrapper>
				<DonationFormHeader>Spendenformular</DonationFormHeader>

				{iFrameLoading && <Skeleton height={'843px'} />}
				{iFrameError && (
					<IFrameLoadErrorMessage>Leider ist ein Fehler beim laden des Formular aufgetreten.</IFrameLoadErrorMessage>
				)}
				{!isSSR && (
					<StyledDonationFormIframe
						height={iFrameLoading ? 0 : iFrameHeight}
						onLoad={iFrameLoaded}
						onError={iFrameLoadedError}
						id="iframe"
						src={`${makeAWishAPI.donationFormURL}${project.makeAWishProjectId}`}
						title="Spendenformular"
					/>
				)}
			</DonationIFrameWrapper>

			<StyledDonationSumWidget>
				<DonationWidgetCount
					current_amount={makeAWishProject ? makeAWishProject.current_donation_sum : '0'}
					donation_goal_amount={makeAWishProject ? makeAWishProject.donation_goal : '0'}
				/>
			</StyledDonationSumWidget>
			<StyledDonatorsWidget>
				<DonationWidget title={'TOP-Spender'}>
					<DonationWidgetList list={highestDonatorsList} />
				</DonationWidget>
			</StyledDonatorsWidget>
			<StyledLatestDonatorssWidget>
				<DonationWidget title={'Letzte Spender'}>
					<DonationWidgetList list={latestDonatorsList} />
				</DonationWidget>
			</StyledLatestDonatorssWidget>
		</React.Fragment>
	)
}

export const getStaticProps: GetStaticProps<InitialDonationProps> = async ({ params }) => {
	let currentStream: Upcoming
	const streamer = params.streamer as string
	for (const stream of cmsContent.upcoming) {
		if (stream.streamerChannel === streamer) {
			currentStream = stream
			break
		}
	}
	return {
		props: { project: currentStream, featuredStream: cmsContent.featuredStream },
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const upcoming = cmsContent.upcoming
	return {
		paths: upcoming.map((u) => ({ params: { streamer: u.streamerChannel } })),
		fallback: false,
	}
}
;((DonatePage as unknown) as PageWithLayoutType).layout = DonationLayout

export default DonatePage
