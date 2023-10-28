import { makeAWishAPI } from '../../config'
import { CmsUpcomingStreamer } from '../cms/cms'
import { MakeAWishInfoJsonDTO } from '../dto/MakeAWishDTOs'
import { TwitchStreamsDTO } from '../dto/TwitchStreamsDTO'
import { TwitchUsersDTO } from '../dto/TwitchUsersDTO'

const maxWidth = 972 // 300px x 3 grid item with + 72px padding width

export const responsiveMaxSizeThreshold = {
	phone: 576,
	tablet: 910,
	desktop: 9999999,
}

interface StreamSize {
	width: number
	height: number
}

export function getFeaturedStreamSize(): StreamSize {
	let width = document.body.clientWidth

	// padding for phone
	if (window.innerWidth > responsiveMaxSizeThreshold.phone) {
		width = document.body.clientWidth - 48
	}

	// maximum iframe size
	if (width > maxWidth) {
		width = maxWidth - 21
	}
	return { width, height: width * (9 / 16) }
}

export function getPercentage(current: number, goal: number) {
	return (100 * current) / goal
}

export function getLoginDisplayNameFromTwitchURI(twitchURI: string) {
	const splitURI = twitchURI.split('/')
	return splitURI[splitURI.length - 1]
}

export function sortByDateString(first: CmsUpcomingStreamer, second: CmsUpcomingStreamer) {
	return new Date(first.date).getTime() - new Date(second.date).getTime()
}

export async function fetchTwitchUsersBySchedule(schedule: CmsUpcomingStreamer[]) {
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
			cache: 'force-cache',
		})
		if (!res.ok) {
			throw new Error(`HTTP Error ${res.status}: fetching twitch users was not successfull`)
		}
		return (await res.json()) as TwitchUsersDTO
	} catch (e) {
		console.log(`Couldn't fetchTwitchUsersBySchedule: ${e}`)
	}
}

export async function fetchTwitchStreamBySchedule(schedule: CmsUpcomingStreamer[]) {
	if (typeof window !== 'undefined') return null
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
		if (!res.ok) {
			throw new Error(`HTTP Error ${res.status}: fetchTwitchStreamBySchedule was not successfull`)
		}
		return (await res.json()) as TwitchStreamsDTO
	} catch (e) {
		console.log(`Couldn't fetchTwitchStreamBySchedule: ${e}`)
	}
}

export async function fetchMakeAWishData() {
	try {
		const res = await fetch(`${makeAWishAPI.donationsURL}`, {})
		return (await res.json()) as MakeAWishInfoJsonDTO
	} catch (e) {
		console.log(`Couldn't fetchMakeAWishData: ${e}`)
	}
}

// References to https://blog.agney.dev/styled-components-&-typescript/
export const customMediaQuery = (minWidth: number, maxWidth: number) =>
	`@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`

export const hasProperty = (obj: Record<string, unknown>, key: string) => {
	return Object.prototype.hasOwnProperty.call(obj, key)
}
