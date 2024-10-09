const year = 2024

export const makeAWishAPI = {
	donationsURL: `https://streamer.make-a-wish.at/charityroyale${year}/info.json`,
	donorsURL: `https://streamer.make-a-wish.at/charityroyale${year}/donors.json`,
	donationFormURL: `https://streamer.make-a-wish.at/charityroyale${year}/donate/`,
	donationFormEnURL: `https://streamer.make-a-wish.at/charityroyale${year}/donate-en/`,

	refreshInterval: 30000,
}

export const statsApi = {
	liveStreamsUrl: 'https://stats.hammertime.studio/streams',
	refreshInterval: 180 * 10000, // refresh each 30 mins
}
