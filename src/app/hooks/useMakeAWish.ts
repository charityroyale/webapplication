import useSWR from 'swr'
import { makeAWishAPI } from '../../config'
import { MakeAWishInfoJsonDTO } from '../dto/MakeAWishDonationsDTO'

const fetcher = (url: string) =>
	fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	}).then((res) => res.json())

export const useMakeAWish = () => {
	const { data, error } = useSWR(makeAWishAPI.donationsURL, fetcher, {
		refreshInterval: makeAWishAPI.refreshInterval,
	})

	return {
		makeAWishData: data as MakeAWishInfoJsonDTO,
		makeAWishDataIsLoading: !error && !data,
		makeAWishDataIsError: !!error,
	}
}
