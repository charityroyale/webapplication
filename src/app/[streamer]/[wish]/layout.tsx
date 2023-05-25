import React, { ReactNode } from 'react'
import { makeAWishAPI } from '../../../config'
import { GetStaticProps, GetStaticPaths } from 'next'
import { cmsStreamerWishes, cmsDonationPagePaths, CmsUpcomingStreamer, MakeAWishWish } from '../../(site)/cms/cms'

interface DonationPageProps {
	children?: ReactNode
	cms: {
		streamer: CmsUpcomingStreamer
		wish: MakeAWishWish
	}
}

export default async function SiteLayout({ children, cms }: DonationPageProps) {
	return (
		<React.Fragment>
			<head>
				<title>Charity Royale - {cms.streamer.streamerName}</title>
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
			</head>
			<React.Fragment>{children}</React.Fragment>
		</React.Fragment>
	)
}

export const getStaticProps: GetStaticProps<DonationPageProps> = async ({ params }) => {
	// This function is not called on the client and would fail at build-time
	// params are passed by `cmsDonationPagePaths` in `cms.ts`.

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const streamerSlug = params!.streamer as string
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const wishSlug = params!.wish as string

	const donationPageSlug = streamerSlug + wishSlug

	return {
		props: {
			cms: {
				...cmsStreamerWishes[donationPageSlug],
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
