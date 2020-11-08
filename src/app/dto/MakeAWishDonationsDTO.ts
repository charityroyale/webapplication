export class MakeWishDonationsDTO {
	public total_donation_sum = ''
	public total_donation_count = -1
	public projects = {} as { [projectId: string]: MakeWishDonationProjectDTO }
}

export class MakeAWishRecentDonatorDTO {
	public unix_timestamp = -1
	public name = ''
	public amount = ''
}

export class MakeAWishTopDonatorDTO {
	public name = ''
	public amount = ''
}

export class MakeWishDonationProjectDTO {
	public project_id = ''
	public slug = ''
	public donation_goal = ''
	public current_donation_sum = ''
	public current_donation_count = -1
	public top_donators = [] as MakeAWishTopDonatorDTO[]
	public recent_donators = [] as MakeAWishRecentDonatorDTO[]
}
