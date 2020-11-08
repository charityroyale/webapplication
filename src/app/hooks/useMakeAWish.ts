import useSWR from 'swr'
import { makeAWishAPI } from '../../config'
import { MakeWishDonationsDTO } from '../dto/MakeAWishDonationsDTO'

const dummyResponse: MakeWishDonationsDTO = {
	total_donation_sum: '28154.44',
	total_donation_count: 526,
	projects: {
		'1': {
			project_id: '1',
			slug: 'lilli-disneyland',
			donation_goal: '5350.00',
			current_donation_sum: '9769.76',
			current_donation_count: 8,
			top_donators: [
				{
					name: 'ataub2qf',
					amount: '5000.54',
				},
				{
					name: 'MrsXeniaTV',
					amount: '1000.00',
				},
				{
					name: 'SchleStone',
					amount: '52.12',
				},
			],
			recent_donators: [
				{
					unix_timestamp: 1596786221,
					name: 'Ellinara',
					amount: '5.54',
				},
				{
					unix_timestamp: 1596785012,
					name: 'Anonym',
					amount: '31.42',
				},
				{
					unix_timestamp: 1596784074,
					name: 'SchleStone',
					amount: '52.12',
				},
			],
		},
		'2': {
			project_id: '2',
			slug: 'eren-istanbul',
			donation_goal: '5170.00',
			current_donation_sum: '220.83',
			current_donation_count: 8,
			top_donators: [
				{
					name: 'derpauli',
					amount: '103.88',
				},
				{
					name: 'CmdChief',
					amount: '52.12',
				},
				{
					name: 'R1mr0tt',
					amount: '36.59',
				},
			],
			recent_donators: [
				{
					unix_timestamp: 1596786702,
					name: 'derpauli',
					amount: '103.88',
				},
				{
					unix_timestamp: 1596785699,
					name: 'Sweetchuck_90',
					amount: '5.54',
				},
				{
					unix_timestamp: 1596784711,
					name: 'CmdChief',
					amount: '52.12',
				},
			],
		},
		'3': {
			project_id: '3',
			slug: 'valentina-zoo-salzburg',
			donation_goal: '250.00',
			current_donation_sum: '211.99',
			current_donation_count: 10,
			top_donators: [
				{
					name: 'roFl2k10',
					amount: '52.12',
				},
				{
					name: 'Luetz89',
					amount: '30.00',
				},
				{
					name: 'David19051312',
					amount: '19.05',
				},
			],
			recent_donators: [
				{
					unix_timestamp: 1596787224,
					name: 'roFl2k10',
					amount: '52.12',
				},
				{
					unix_timestamp: 1596785596,
					name: 'Rafaela',
					amount: '10.71',
				},
				{
					unix_timestamp: 1596785045,
					name: 'Anonym',
					amount: '5.00',
				},
			],
		},
		'4': {
			project_id: '4',
			slug: 'loreen-norwegen',
			donation_goal: '2780.00',
			current_donation_sum: '62.55',
			current_donation_count: 7,
			top_donators: [
				{
					name: 'Chalandra86',
					amount: '21.07',
				},
				{
					name: 'schmirly',
					amount: '17.29',
				},
				{
					name: 'Therobbe1',
					amount: '10.71',
				},
			],
			recent_donators: [
				{
					unix_timestamp: 1596785911,
					name: 'eliteemo',
					amount: '5.54',
				},
				{
					unix_timestamp: 1596784824,
					name: 'schmirly',
					amount: '12.50',
				},
				{
					unix_timestamp: 1596783705,
					name: 'schmirly',
					amount: '4.79',
				},
			],
		},
		'5': {
			project_id: '5',
			slug: 'abdallah-jugendzimmer',
			donation_goal: '2320.00',
			current_donation_sum: '256.02',
			current_donation_count: 4,
			top_donators: [
				{
					name: 'Doombreaker30',
					amount: '207.40',
				},
				{
					name: 'Maleen',
					amount: '5.45',
				},
				{
					name: 'Claudia',
					amount: '1.40',
				},
			],
			recent_donators: [
				{
					unix_timestamp: 1596785504,
					name: 'Doombreaker30',
					amount: '207.40',
				},
				{
					unix_timestamp: 1596781968,
					name: 'Anonym',
					amount: '41.77',
				},
				{
					unix_timestamp: 1596716494,
					name: 'Claudia',
					amount: '1.40',
				},
			],
		},
		'0': {
			project_id: 'null',
			slug: 'anonyme-wuensche',
			donation_goal: '0',
			current_donation_sum: '17633.29',
			current_donation_count: 489,
			top_donators: [
				{
					name: 'Philos',
					amount: '3184.06',
				},
				{
					name: 'FrufruTv',
					amount: '1760.56',
				},
				{
					name: 'swissduayne1996',
					amount: '1419.97',
				},
			],
			recent_donators: [
				{
					unix_timestamp: 1604836904,
					name: 'alex-test',
					amount: '5.54',
				},
				{
					unix_timestamp: 1604836847,
					name: 'alex-test',
					amount: '5.54',
				},
				{
					unix_timestamp: 1597086153,
					name: 'stickerandmore eu',
					amount: '103.88',
				},
			],
		},
	},
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const dummyFetcher = (url: string) => new Promise((resolve) => setTimeout(() => resolve(dummyResponse), 500))

export default function useMakeAWish() {
	const { data, error } = useSWR(makeAWishAPI.donationsURL, dummyFetcher) // TODO: use dummy data until api point supports CORS

	return {
		data: data as MakeWishDonationsDTO,
		isLoading: !error && !data,
		isError: !!error,
	}
}
