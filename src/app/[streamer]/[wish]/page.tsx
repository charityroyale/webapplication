'use client'
import React from 'react'
import { Metadata } from 'next'
import { cmsDonationPagePaths, cmsStreamerWishesFilled } from '../../(site)/cms/cms'
import { makeAWishAPI } from '../../../config'
import { DonatePageContent } from './components/content'
import { styled } from '../../../styles/Theme'
import CookieBanner from '../../(site)/cms/components/CookieBanner'
import Footer from '../../(site)/cms/components/Footer/Footer'
import Header from '../../(site)/cms/components/Header/Header'
import { StyledLayout } from '../../../styles/common.styles'

type Props = {
	params: { streamer: string; wish: string }
	searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const streamerSlug = params.streamer
	const wishSlug = params.wish
	const donationPageSlug = streamerSlug + wishSlug
	const cms = {
		...cmsStreamerWishesFilled[donationPageSlug],
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
			// siteId: '', // id of @CharityRoyale
			creator: '@CharityRoyale',
			// creatorId: '', // id of @CharityRoyale
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
		...cmsStreamerWishesFilled[donationPageSlug],
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

			<StyledLayout>
				<CookieBanner />
				<Header />
				<MainGrid>
					<DonatePageContent cms={cms} />
				</MainGrid>
				<Footer />
			</StyledLayout>
		</div>
	)
}

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
