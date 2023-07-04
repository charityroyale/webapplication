import { Twitch } from 'twitch'

declare global {
	interface Window {
		Twitch: Twitch
	}
}
