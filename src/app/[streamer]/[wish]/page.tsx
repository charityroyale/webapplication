import React from 'react'
import { Metadata } from 'next'
import { cmsDonationPagePaths, cmsStreamerWishes } from '../../(site)/cms/cms'
import { makeAWishAPI } from '../../../config'

type Props = {
	params: { streamer: string; wish: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const streamerSlug = params.streamer
	const wishSlug = params.wish
	const donationPageSlug = streamerSlug + wishSlug
	const cms = {
		...cmsStreamerWishes[donationPageSlug],
	}
	return {
		title: `Charity Royale - ${cms.streamer.streamerName}`,
		openGraph: {
			title: `${cms.streamer.streamerName}'s Spendenseite`,
			description: 'Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.',
			url: 'https://charityroyale.at',
			siteName: `${cms.streamer.streamerName}'s Spendenseite`,

			images: [
				{
					url: 'https://charityroyale.at/uploads/charity_royale_rgb_300x300.png',
					width: 300,
					height: 300,
				},
			],
			locale: 'de_AT',
			type: 'website',
		},
		twitter: {
			title: `${cms.streamer.streamerName}'s Spendenseite`,
			description: `${cms.streamer.streamerName}'s Spendenseite`,
			siteId: '', // id of @CharityRoyale
			creator: '@CharityRoyale',
			creatorId: '', // id of @CharityRoyale
			images: ['https://charityroyale.at/uploads/charity_royale_rgb_300x300.png'],
		},
	}
}

// generate alls streamers with wish pages statically
export async function generateStaticParams() {
	return cmsDonationPagePaths
}

export default function Page({ params }: Props) {
	const streamerSlug = params.streamer
	const wishSlug = params.wish
	const donationPageSlug = streamerSlug + wishSlug
	const cms = {
		...cmsStreamerWishes[donationPageSlug],
	}
	return (
		<div>
			{/** START
			 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#unsupported-metadata
			 **/}
			<link
				rel="preload"
				as="document"
				href={`${makeAWishAPI.donationFormURL}${cms.streamer.streamerChannel}/${cms.wish.slug}`}
			></link>
			<link
				rel="preload"
				as="script"
				href="https://www.paypal.com/sdk/js?client-id=ARva2JSJxkYe3aON0p68XxuHWEw-HaEqajH0a990PelhZZGnFh04CUOQpOgWURnRZqVdcQAo9tfFLUl_&currency=EUR"
			></link>
			<meta property="fb:app_id" content={process.env.FB_ID} key="fbappid" />
			{/** END */}

			<div>
				{cms.streamer.streamerName}
				{cms.wish.childname}
			</div>
		</div>
	)
}
