import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import rawCmsContent from '../../../_posts/frontpage/charity-royale.md'
import Head from 'next/head'
import DonationHeader from '../../app/components/DonationHeader'
import DonationWidget from '../../app/components/DonationWidget'
import DonationWidgetCount from '../../app/components/DonationWidgetCount'
import DonationWidgetList, { List } from '../../app/components/DonatorsWidgetList'
import {
	StyledDonationFormIframe,
	StyledDonationSumWidget,
	StyledDonatorsWidget,
	StyledLatestDonatorssWidget,
} from '../../styles/common.styles'
import DonationLayout from '../../app/layouts/DonationLayout'
import PageWithLayoutType from '../../app/types/PageWithLayout'
import { makeAWishAPI } from '../../config'
import useMakeAWish from '../../app/hooks/useMakeAWish'
import { MakeWishDonationProjectDTO } from '../../app/dto/MakeAWishDonationsDTO'
import { formatDateDefault } from '../../app/utils/formatUtils'
import { CmsContent, Upcoming } from '../../app/types/CmsContent'

interface InitialDonationProps {
	project: Upcoming
}

const cmsContent = rawCmsContent.attributes as CmsContent

const DonatePage: NextPage<InitialDonationProps> = ({ project }: InitialDonationProps) => {
	const router = useRouter()
	const { streamer } = router.query

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
			col_1: `${i + 1}.`,
			col_2: r.name,
			col_3: r.amount,
		}))
	}

	return (
		<>
			<Head>
				<title>Charity Royale 2020 - Spenden</title>
			</Head>

			<DonationHeader title={`Spendenprojekt: ${project.streamerName}`} description={project.descripion} />

			<StyledDonationFormIframe
				src={`${makeAWishAPI.donationFormURL}${project.makeAWishProjectId}`}
				title="Spendenformular"
			/>

			<StyledDonationSumWidget>
				<DonationWidget title={'Spendensumme'}>
					<DonationWidgetCount
						current_amount={makeAWishProject ? makeAWishProject.current_donation_sum : '0'}
						donation_goal_amount={makeAWishProject ? makeAWishProject.donation_goal : '0'}
					/>
				</DonationWidget>
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
