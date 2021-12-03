import rawCmsContent from '../../../_cms/charity-royale.md'

export interface CmsUpcomingStreamer {
	streamerName: string
	streamerChannel: string
	streamLink: string
	customLink?: string
	imgUrl: string
	date: string
	type: 'main' | 'community' | ''
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

export interface DonationPageProps {
	streamer: CmsUpcomingStreamer
	wish: MakeAWishWish
}

const cmsContent = rawCmsContent.attributes as CmsContent

const streamers = cmsContent.upcoming
const wishes = cmsContent.wishes

export const streamerWishes = {} as { [key: string]: DonationPageProps }
const wishKeys: string[] = []
for (const streamer of streamers) {
	for (const wish of wishes) {
		if (streamer.wishes.includes(wish.slug)) {
			streamerWishes[streamer.streamerChannel + wish.slug] = {
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

export const paths = wishKeys.map((key) => {
	return { params: { streamer: streamerWishes[key].streamer.streamerChannel, wishSlug: streamerWishes[key].wish.slug } }
})

export default cmsContent
