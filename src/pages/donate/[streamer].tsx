import React, { useCallback, useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import rawCmsContent from '../../../_cms/frontpage/charity-royale.md'
import Head from 'next/head'
import DonationHeader from '../../app/components/DonationHeader'
import DonationWidget from '../../app/components/DonationWidget'
import DonationWidgetCount from '../../app/components/DonationWidgetCount'
import DonationWidgetList, { List } from '../../app/components/DonatorsWidgetList'
import { StyledDonationSumWidget, StyledDonatorsWidget, StyledLatestDonatorssWidget } from '../../styles/common.styles'
import DonationLayout from '../../app/layouts/DonationLayout'
import PageWithLayoutType from '../../app/types/PageWithLayout'
import { makeAWishAPI } from '../../config'
import useMakeAWish from '../../app/hooks/useMakeAWish'
import { MakeWishDonationProjectDTO } from '../../app/dto/MakeAWishDonationsDTO'
import { formatDateDefault } from '../../app/utils/formatUtils'
import { styled } from '../../styles/Theme'
import Skeleton from 'react-loading-skeleton'
import { useIsSSR } from '../../app/components/isSSR'
import { CmsContent, Upcoming } from '../../app/types/CmsContent'
import { ImTrophy } from 'react-icons/im'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaDove } from 'react-icons/fa'
import { Line } from 'rc-progress'
import { getPercentage } from '../../app/utils/commonUtils'

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

interface InitialDonationProps {
	project: Upcoming
}

const cmsContent = rawCmsContent.attributes as CmsContent

const getTopDonatorFirstColum = (index) => {
	switch (index) {
		case 0: {
			return <ImTrophy color={'gold'} />
		}
		case 1: {
			return <ImTrophy color={'silver'} />
		}
		case 2: {
			return <ImTrophy color={'sandybrown'} />
		}
		default: {
			return ``
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
	if (!makeAWish.isError && !makeAWish.isLoading) {
		makeAWishProject = makeAWish.data.projects[project.makeAWishProjectId]
		latestDonatorsList = makeAWishProject.recent_donators.map((r) => ({
			col_1: formatDateDefault(new Date(r.unix_timestamp * 1000)),
			col_2: r.name,
			col_3: r.amount,
		}))
		highestDonatorsList = makeAWishProject.top_donators.map((r, i) => ({
			col_1: getTopDonatorFirstColum(i),
			col_2: r.name,
			col_3: r.amount,
		}))
	}

	useEffect(() => {
		const handler = (event) => {
			const data = event.data
			if (data.hasOwnProperty('frameHeight')) {
				setIframeHeight(`${data.frameHeight}px`)
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

	const donationSum =
		makeAWish.isLoading || makeAWish.isError
			? '0'
			: parseInt(makeAWishProject.current_donation_sum).toLocaleString('de-DE')

	const donationGoal =
		makeAWish.isLoading || makeAWish.isError ? '0' : parseInt(makeAWishProject.donation_goal).toLocaleString('de-DE')

	const donatorsCount =
		makeAWish.isLoading || makeAWish.isError ? '0' : makeAWishProject.current_donation_count.toLocaleString('de-DE')

	const percentage = getPercentage(
		makeAWish.isLoading || makeAWish.isError ? 0 : parseInt(makeAWishProject.current_donation_sum),
		makeAWish.isLoading || makeAWish.isError ? 0 : parseInt(makeAWishProject.donation_goal)
	)

	useEffect(() => {
		if (percentage >= 100) {
			setHasReachGoal(true)
		} else {
			setHasReachGoal(false)
		}
	}, [])

	return (
		<>
			<Head>
				<title>Charity Royal 2020 - {project.streamerName}</title>
			</Head>

			<DonationHeader
				streamLink={project.streamLink}
				streamerName={project.streamerName}
				title={project.tagline}
				description={project.descripion}
			>
				<React.Fragment>
					<DonationStatsTitle>Spendenübersicht</DonationStatsTitle>
					<DonationSubPageStats>
						<div style={{ marginRight: '20px' }}>
							<FaDove color="white" size="40" />
						</div>

						<DonationStatsWidget>
							<p>Gespendet {donationSum}€</p>
							<Line
								style={{ padding: '4px 0' }}
								percent={percentage}
								strokeWidth={4}
								trailWidth={4}
								trailColor="white"
								strokeColor={hasReachedGoal && !makeAWish.isLoading ? 'green' : 'gold'}
							/>
							<DonationStatsWidgetGoal>Ziel {donationGoal}€</DonationStatsWidgetGoal>
						</DonationStatsWidget>
					</DonationSubPageStats>
					<DonationSubPageStats>
						<div style={{ marginRight: '20px' }}>
							<BsFillPeopleFill color="white" size="40" />
						</div>

						<DonationStatsWidget>Spender {donatorsCount}</DonationStatsWidget>
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
		</>
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
