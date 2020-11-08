import { makeAWishAPI } from '../../config'
import { MakeWishDonationsDTO } from '../dto/MakeAWishDonationsDTO'
import { TwitchStreamsDTO } from '../dto/TwitchStreamsDTO'
import { TwitchUsersDTO } from '../dto/TwitchUsersDTO'

const maxWidth = 972 // 300px x 3 grid item with + 72px padding width

export const responsiveMaxSizeThreshold = {
	phone: 576,
	tablet: 768,
	desktop: 9999999,
}

interface StreamSize {
	width: number
	height: number
}

export function getFeaturedStreamSize(): StreamSize {
	let width = document.body.clientWidth
	if (window.innerWidth > responsiveMaxSizeThreshold.phone) {
		width = document.body.clientWidth - 48
	}
	if (width > maxWidth) {
		width = maxWidth
	}
	return { width, height: width * (9 / 16) }
}

export function getPercentage(current: number, goal: number): number {
	return (100 * current) / goal
}

export function getLoginDisplayNameFromTwitchURI(twitchURI: string): string {
	const splitURI = twitchURI.split('/')
	return splitURI[splitURI.length - 1]
}

export async function fetchTwitchUsersBySchedule(schedule: any): Promise<TwitchUsersDTO> {
	try {
		const loginIds = []
		for (const el of schedule) {
			loginIds.push(getLoginDisplayNameFromTwitchURI(el.streamLink))
		}
		const query = loginIds.join('&login=')
		const res = await fetch(`https://api.twitch.tv/helix/users?login=${query}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
				'Client-Id': `${process.env.TWITCH_CLIENT_ID}`,
			},
		})
		return (await res.json()) as TwitchUsersDTO
	} catch (e) {
		console.log(e)
	}
}

export async function fetchTwitchStreamBySchedule(schedule: any): Promise<TwitchStreamsDTO> {
	try {
		const loginIds = []
		for (const el of schedule) {
			loginIds.push(getLoginDisplayNameFromTwitchURI(el.streamLink))
		}
		const query = loginIds.join('&user_login=')
		const res = await fetch(`https://api.twitch.tv/helix/streams?user_login=${query}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
				'Client-Id': `${process.env.TWITCH_CLIENT_ID}`,
			},
		})
		return (await res.json()) as TwitchStreamsDTO
	} catch (e) {
		console.log(e)
	}
}

export async function fetchMakeAWishData(): Promise<MakeWishDonationsDTO> {
	try {
		const res = await fetch(`${makeAWishAPI.donationsURL}`, {})
		return (await res.json()) as MakeWishDonationsDTO
	} catch (e) {
		console.log(e)
	}
}
