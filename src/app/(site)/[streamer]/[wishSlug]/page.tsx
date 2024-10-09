import React from 'react'
import { Metadata } from 'next'
import { DonatePageContent } from './components/content'
import { makeAWishAPI } from '../../../../config'
import { cmsStreamerWishesFilled, cmsDonationPagePaths } from '../../../cms/cms'

type Props = {
	params: { streamer: string; wishSlug: string }
	searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	if (params.streamer === 'A' || params.wishSlug === 'A') {
		return {}
	}
	const streamerSlug = params.streamer
	const wishSlug = params.wishSlug
	const donationPageSlug = streamerSlug + wishSlug
	const cms = {
		...cmsStreamerWishesFilled[donationPageSlug],
	}

	return {
		title: `Charity Royale | ${cms.streamer.streamerName}'s Spendenseite`,
		openGraph: {
			title: `Charity Royale | ${cms.streamer.streamerName}'s Spendenseite`,
			siteName: `Charity Royale | ${cms.streamer.streamerName}'s Spendenseite`,
		},
		twitter: {
			title: `Charity Royale | ${cms.streamer.streamerName}'s Spendenseite`,
		},
	}
}

export async function generateStaticParams() {
	return cmsDonationPagePaths.length > 0 ? cmsDonationPagePaths : [{ streamer: 'A', wishSlug: 'A' }]
}

export default async function Page({ params }: Props) {
	if (params.streamer === 'A' || params.wishSlug === 'A') {
		return <React.Fragment></React.Fragment>
	}
	const streamerSlug = params.streamer
	const wishSlug = params.wishSlug
	const donationPageSlug = streamerSlug + wishSlug
	const cms = {
		...cmsStreamerWishesFilled[donationPageSlug],
	}

	return (
		<React.Fragment>
			{/** START
			 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#unsupported-metadata
			 **/}
			<link
				rel="preload"
				// <link rel=preload> uses an unsupported `as` value
				// as="document"
				href={`${makeAWishAPI.donationFormURL}${cms.streamer.streamerChannel}/${cms.wish.slug}`}
			></link>
			<link
				rel="preload"
				as="script"
				href="https://www.paypal.com/sdk/js?client-id=ARva2JSJxkYe3aON0p68XxuHWEw-HaEqajH0a990PelhZZGnFh04CUOQpOgWURnRZqVdcQAo9tfFLUl_&currency=EUR"
			></link>
			<meta property="fb:app_id" content={process.env.FB_ID} key="fbappid" />
			{/** END */}
			<DonatePageContent cms={cms} />
		</React.Fragment>
	)
}
