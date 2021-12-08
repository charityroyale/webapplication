import { StreamerType } from '../cms/cms'

/**
 * Clientside DTO
 * Latest changes and updates
 */
export class MakeAWishInfoJsonDTO {
	public id = '' // some MAW internal ID
	public total_donation_sum = '' // sum of donations
	public total_donation_count = -1 // count of unqique donators
	public last_update = -1 // unix timestamp of latest update
	public streamers = {} as { [streamerSlug: string]: MakeAWishStreamerDTO }
	public wishes = {} as { [wishSlug: string]: MakeAWishRootLevelWishDTO }
	public recent_donations: MakeWishInfoJsonRecentDonationDTO[] = [] // latest 10 donations made over all wishes
	public top_donors: MakeAWishInfoJsonTopDonationDTO[] = [] // top 10 donations made over all wishes
}

// Streamer DTOs
class MakeAWishWishStreamerDTO {
	public id = -1 // some MAW internal ID
	public current_donation_sum = ''
	public slug = '' // identifier, streamchannel twitch in lower case
	public current_donation_count = -1
	public top_donors: MakeAWishInfoJsonTopDonationDTO[] = []
	public recent_donations: MakeWishInfoJsonRecentDonationDTO[] = []
}

class MakeAWishStreamerDTO {
	public id = -1 // some MAW internal ID
	public color = '' // some MAW internal color code
	public slug = '' // identifier, streamchannel twitch in lower case
	public name = '' // streamer name
	public type: StreamerType = '' // 'main' or 'community'
	public current_donation_sum = ''
	public current_donation_count = -1
	public top_donors: MakeAWishInfoJsonTopDonationDTO[] = []
	public recent_donations: MakeWishInfoJsonRecentDonationDTO[] = []
	public wishes: [] | { [wishSlug: string]: MakeAWishStreamerWishDTO } = []
}

// Wish DTOs
class MakeAWishRootLevelWishDTO {
	public id = -1 // some MAW internal ID
	public color = '' // some MAW internal color code
	public slug = '' // identifier
	public kid_name = ''
	public wish = '' // MAW internal title of wish
	public donation_goal = ''
	public current_donation_sum = '0'
	public current_donation_count = -1
	public recent_donations: MakeWishInfoJsonRecentDonationDTO[] = []
	public top_donors: MakeAWishInfoJsonTopDonationDTO[] = []
	public streamers: [] | { [streamerSlug: string]: MakeAWishWishStreamerDTO } = [] // streamers who are fullfilling this wish
}

class MakeAWishStreamerWishDTO {
	public id = -1 // some MAW internal ID
	public slug = '' // identifier
	public current_donation_sum = '0'
	public current_donation_count = -1
	public recent_donations: MakeWishInfoJsonRecentDonationDTO[] = []
	public top_donors: MakeAWishInfoJsonTopDonationDTO[] = []
}

// Donation DTOs
export class MakeWishInfoJsonRecentDonationDTO {
	public unix_timestamp = -1
	public username = ''
	public amount = ''
}

export class MakeAWishInfoJsonTopDonationDTO {
	public username = ''
	public amount = ''
}
