import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import rawCmsContent from '../../../_posts/frontpage/charity-royale.md'
import Head from 'next/head'
import DonationHeader from '../../app/components/DonationHeader'
import DonationWidget from '../../app/components/DonationWidget'
import DonationWidgetCount from '../../app/components/DonationWidgetCount'
import DonationWidgetList from '../../app/components/DonatorsWidgetList'
import {
	StyledDonationFormIframe,
	StyledDonationSumWidget,
	StyledDonatorsWidget,
	StyledLatestDonatorssWidget,
} from '../../styles/common.styles'
import DonationLayout from '../../app/layouts/DonationLayout'
import PageWithLayoutType from '../../app/types/PageWithLayout'

interface InitialDonationProps {
	project: Upcoming
}

interface Upcoming {
	date: string
	streamerName: string
	streamerChannel: string
	streamLink: string
	makeAWishProjectId: string
	descripion: string
	imgUrl: string
}

interface CmsContent {
	title: string
	date: string
	thumbnail: string
	featuredStream: string
	upcoming: Array<Upcoming>
}

const cmsContent = rawCmsContent.attributes as CmsContent

const highestDonatorsList = [
	{
		col_1: '1',
		col_2: 'Philos',
		col_3: '3.184,06',
	},
	{
		col_1: '2',
		col_2: 'FrufruTv',
		col_3: '1.760,56',
	},
	{
		col_1: '3',
		col_2: 'swissduayne1996',
		col_3: '1.419,97',
	},
	{
		col_1: '4',
		col_2: 'FreeSteyler01',
		col_3: '862,92',
	},
	{
		col_1: '5',
		col_2: 'Darina420',
		col_3: '530,12',
	},
]

const latestDonators = [
	{
		col_1: 'Mo 21:02',
		col_2: 'Philos',
		col_3: '103,88',
	},
	{
		col_1: 'Mo 09:53',
		col_2: 'FrufruTv',
		col_3: '50,00',
	},
	{
		col_1: 'So 19:23',
		col_2: 'swissduayne1996',
		col_3: '60,00',
	},
	{
		col_1: 'So 19:21',
		col_2: 'FreeSteyler01',
		col_3: '31,42',
	},
	{
		col_1: 'So 19:15',
		col_2: 'Darina420',
		col_3: '103,88',
	},
]

const DonatePage: NextPage<InitialDonationProps> = ({ project }: InitialDonationProps) => {
	const router = useRouter()
	const { streamer } = router.query
	return (
		<>
			<Head>
				<title>Charity Royale 2020 - Spenden</title>
			</Head>

			<DonationHeader title={`Spendenprojekt: ${project.streamerName}`} description={project.descripion} />

			<StyledDonationFormIframe
				src={`https://streamer.make-a-wish.at/charityroyale2020/donate/${project.makeAWishProjectId}`}
				title="Spendenformular"
			/>

			<StyledDonationSumWidget>
				<DonationWidget title={'Spendensumme'}>
					<DonationWidgetCount current_amount={30} donation_goal_amount={100} />
				</DonationWidget>
			</StyledDonationSumWidget>
			<StyledDonatorsWidget>
				<DonationWidget title={'TOP-Spender'}>
					<DonationWidgetList list={highestDonatorsList} />
				</DonationWidget>
			</StyledDonatorsWidget>
			<StyledLatestDonatorssWidget>
				<DonationWidget title={'Letzte Spender'}>
					<DonationWidgetList list={latestDonators} />
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
		props: { project: currentStream },
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
