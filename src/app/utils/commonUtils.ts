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

export async function fetchStream(name: string): Promise<void> {
	try {
		const res = await fetch(`https://api.twitch.tv/helix/search/channels?query=${name}&first=1`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
				'Client-Id': `${process.env.TWITCH_CLIENT_ID}`,
			},
		})
		return await res.json()
	} catch (e) {}
}
