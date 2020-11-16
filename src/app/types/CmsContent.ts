export interface Upcoming {
	streamerName: string
	streamerChannel: string
	streamLink: string
	imgUrl: string
	date: string
	makeAWishProjectId: string
	descripion: string
	tagline: string
	childname: string
}

export interface FAQEntry {
	question: string
	answer: string
}

export interface CmsContent {
	title: string
	date: string
	thumbnail: string
	featuredStream: string
	upcoming: Array<Upcoming>
	faq: Array<FAQEntry>
}
