import useSWR from 'swr'
import { MakeAWishInfoJsonDTO } from '../dto/MakeAWishDTOs'
import { makeAWishAPI } from '../../../config'

const fetcher = (url: string) =>
	fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	}).then((res) => res.json())

export const useMakeAWish = () => {
	const { data, error } = useSWR<MakeAWishInfoJsonDTO>(makeAWishAPI.donationsURL, fetcher, {
		refreshInterval: makeAWishAPI.refreshInterval,
	})

	return {
		makeAWishData: data as MakeAWishInfoJsonDTO,
		makeAWishDataIsLoading: !error && !data,
		makeAWishDataIsError: !!error,
	}
}
