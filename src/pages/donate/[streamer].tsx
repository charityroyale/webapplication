import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import rawCmsContent from '../../../_posts/frontpage/charity-royale.md'
import Head from 'next/head'

interface InitialDonationProps {
	project: Upcoming
}

interface Upcoming {
	date: string
	streamerName: string
	streamerChannel: string
	streamLink: string
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

const DonatePage: NextPage<InitialDonationProps> = ({ project }: InitialDonationProps) => {
	const router = useRouter()
	const { streamer } = router.query
	return (
		<>
			<Head>
				<title>Charity Royale 2020 - Spenden</title>
			</Head>
			<p>
				Donate for {streamer}. {project.streamLink}
			</p>
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

export default DonatePage
