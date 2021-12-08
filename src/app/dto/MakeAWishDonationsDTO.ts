/**
 * Clientside DTO
 * Latest changes and updates
 */
export class MakeAWishInfoJsonDTO {
	public total_donation_sum = ''
	public total_donation_count = -1
	public streamers = {} as { [streamerSlug: string]: MakeAWishStreamerJSONDTO | undefined }
	public wishes = {} as { [wishSlug: string]: MakeAWishWishDTO | undefined }
	public recent_donations: MakeAWishRecentDonationDTO[]
	public top_donors: MakeAWishRecentDonationDTO[]
}

export class MakeAWishRecentDonationDTO {
	public unix_timestamp = -1
	public username = ''
	public amount = ''
}

export class MakeAWishTopDonatorDTO {
	public username = ''
	public amount = ''
}

export class MakeAWishWishDTO {
	public id = -1
	public slug = ''
	public kid_name = ''
	public wish = ''
	public donation_goal = '' // number without postfix
	public current_donation_sum = ''
	public urrent_donation_count = ''
}

export class MakeAwishInfoJsonWishDTO {
	public current_donation_count: -1
	public current_donation_sum: ''
	public id: -1
	public recent_donations: MakeAWishRecentDonationDTO[]
	public slug: ''
	public top_donors: MakeAWishTopDonatorDTO[]
}

export class MakeAWishStreamerDTO {
	public id: -1
	public slug: ''
	public name: ''
	public type: '' // 'main' or 'community'
	public current_donation_sum: ''
	public current_donation_count: -1
	public top_donors: MakeAWishTopDonatorDTO[]
	public recent_donations: MakeAWishRecentDonationDTO[]
	public wishes: MakeAWishWishDTO[]
}

export class MakeAWishStreamerJSONDTO {
	public id: -1
	public slug: ''
	public name: ''
	public type: 'main' | 'community' // 'main' or 'community'
	public current_donation_sum: ''
	public current_donation_count: -1
	public top_donors: MakeAWishTopDonatorDTO[]
	public recent_donations: MakeAWishRecentDonationDTO[]
	public wishes: MakeAwishInfoJsonWishDTO[]
}
