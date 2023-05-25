import rawCmsContent from '../../../../_cms/charity-royale.md'

export type StreamerType = 'main' | 'community'

export interface CmsUpcomingStreamer {
	streamerName: string
	streamerChannel: string
	streamLink: string
	customLink?: string
	imgUrl: string
	date: string
	type: StreamerType
	wishes: string[]
}

export interface UpcomingStreamerDonationPage {
	streamerName: string
	streamerChannel: string
	streamLink: string
	customLink?: string
	imgUrl: string
	date: string
	wishes: MakeAWishWish[]
}

export interface FAQEntryDe {
	'question-de': string
	'answer-de': string
}

export interface FAQEntryEn {
	'question-en': string
	'answer-en': string
}

export interface FAQVideoEntry {
	url: string
	name: string
}

export interface MakeAWishWish {
	slug: string
	tagline: string
	childname: string
	descripion: string
	donationGoal: string
}

export interface CmsContent {
	title: string
	date: string
	thumbnail: string
	featuredStream: string
	customDonationLink?: string
	featuredYoutubeStream?: string
	upcoming: Array<CmsUpcomingStreamer>
	wishes: Array<MakeAWishWish>
	faq: {
		'questions-de': Array<FAQEntryDe>
		'questions-en': Array<FAQEntryEn>
		videos: Array<FAQVideoEntry>
	}
}

export const cmsContent = rawCmsContent.attributes as CmsContent
const featuredDonationLink = cmsContent.customDonationLink || cmsContent.featuredStream
export const cmsFeaturedStreamLink =
	featuredDonationLink === 'https://www.make-a-wish.at'
		? 'https://www.make-a-wish.at'
		: `/donate/${featuredDonationLink}`

const streamers = cmsContent.upcoming
const wishes = cmsContent.wishes

export interface CmsStreamWish {
	streamer: CmsUpcomingStreamer
	wish: MakeAWishWish
}

const cmsStreamerWishes = {} as { [key: string]: CmsStreamWish }
const wishKeys: string[] = []
for (const streamer of streamers) {
	for (const wish of wishes) {
		if (streamer.wishes.includes(wish.slug)) {
			cmsStreamerWishes[streamer.streamerChannel + wish.slug] = {
				streamer: {
					...streamer,
					streamLink: streamer.customLink || streamer.streamLink,
				},
				wish: wish,
			}
			wishKeys.push(streamer.streamerChannel + wish.slug)
		}
	}
}
export const cmsStreamerWishesFilled = cmsStreamerWishes

export const cmsDonationPagePaths = wishKeys.map((key) => {
	return {
		streamer: cmsStreamerWishes[key].streamer.streamerChannel,
		wishSlug: cmsStreamerWishes[key].wish.slug,
	}
})

export default cmsContent
