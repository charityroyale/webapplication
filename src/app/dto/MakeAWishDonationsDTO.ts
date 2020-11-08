export class MakeWishDonationsDTO {
	public total_donation_sum = ''
	public total_donation_count = -1
	public projecs = { '': MakeWishDonationProjectDTO }
}

export class MakeAWishDonatorDTO {
	public unix_timestamp = -1
	public name = ''
	public amount = ''
}

export class MakeWishDonationProjectDTO {
	public project_id = -1
	public slug = ''
	public donation_goal = ''
	public current_donation_sum = ''
	public current_donation_count = ''
	public top_donators = [] as MakeAWishDonatorDTO[]
	public recent_donators = [] as MakeAWishDonatorDTO[]
}
