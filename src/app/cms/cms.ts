import rawCmsContent from '../../../_cms/charity-royale.md'

export interface Upcoming {
	streamerName: string
	streamerChannel: string
	streamLink: string
	customLink?: string
	imgUrl: string
	date: string
	makeAWishProjectId: string
	makeAWish: MakeAWishProject
}

export interface FAQEntry {
	question: string
	answer: string
}

export interface FAQVideoEntry {
	url: string
	name: string
}

export interface MakeAWishProject {
	makeAWishProjectId: string
	descripion: string
	tagline: string
	childname: string
}

export interface CmsContent {
	title: string
	date: string
	thumbnail: string
	featuredStream: string
	customDonationLink?: string
	upcoming: Array<Upcoming>
	makeAWishProjects: Array<MakeAWishProject>
	faq: {
		questions: Array<FAQEntry>
		videos: Array<FAQVideoEntry>
	}
}

const cmsContent = rawCmsContent.attributes as CmsContent

const makeAWishProjects: { [id: string]: MakeAWishProject } = {}
for (const project of cmsContent.makeAWishProjects) {
	makeAWishProjects[project.makeAWishProjectId] = project
}

for (const upcoming of cmsContent.upcoming) {
	upcoming.makeAWish = makeAWishProjects[upcoming.makeAWishProjectId]
}

export default cmsContent
