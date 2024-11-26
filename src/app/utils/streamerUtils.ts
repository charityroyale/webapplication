const multiStreams = [
	['icyvace', 'cherryylein'],
	['xmrcr4zy', 's0ulrider'],
	['stephantschany', 'yourhostlaura'],
	['lunarie_ttv', 'jens'],
	['shillingplays', 'bxrbiex'],
]

const flatMultiStreams = multiStreams.reduce((prev, curr) => prev.concat(curr), [])

export const isMultiStream = (streamer: string) => {
	return flatMultiStreams.includes(streamer.toLowerCase())
}

export const mapStreamerSlugIncludingMultiStreams = (streamer: string) => {
	const normalizedStreamer = streamer.toLowerCase()
	if (!isMultiStream(normalizedStreamer)) {
		return normalizedStreamer
	}

	for (const multiStream of multiStreams) {
		if (multiStream.includes(normalizedStreamer)) {
			return multiStream[multiStream.length - 1]
		}
	}
	return ''
}
