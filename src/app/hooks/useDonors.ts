import useSWR from 'swr'
import { makeAWishAPI } from '../../config'

export interface Donor {
	username: string
	amount_net: string
}

export interface DonorsResponse {
	id: string
	lade_update: number
	donors: Donor[]
}

const fetcher = (url: string) =>
	fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	}).then((res) => res.json())

export const useDonors = () => {
	const { data, error } = useSWR<DonorsResponse>(makeAWishAPI.donorsURL, fetcher, {
		refreshInterval: makeAWishAPI.refreshInterval,
	})

	return {
		donors: data as DonorsResponse,
		isLoadingDonors: !error && !data,
		isLoadingError: !!error,
	}
}
