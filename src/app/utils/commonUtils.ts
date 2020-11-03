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
