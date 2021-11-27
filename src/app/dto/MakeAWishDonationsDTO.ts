/**
 * Clientside DTO
 * Latest changes and updates
 */
export class MakeAWishInfoJsonDTO {
	public total_donation_sum = ''
	public total_donation_count = -1
	public streamers = {} as { [streamerSlug: string]: MakeAWishStreamerDTO }
	public wishes = {} as { [wishSlug: string]: MakeAWishWishDTO }
	public recent_donations: MakeAWishRecentDonationDTO[]
	public top_donors: MakeAWishRecentDonationDTO[]
}

export class MakeAWishRecentDonationDTO {
	public unix_timestamp = -1
	public name = ''
	public amount = ''
}

export class MakeAWishTopDonatorDTO {
	public name = ''
	public amount = ''
}

export class MakeAWishWishDTO {
	public id = -1
	public slug = ''
	public kid_name = ''
	public wish = ''
	public donation_goal = '' // number without postfix
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
