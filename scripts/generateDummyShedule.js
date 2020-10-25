// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const dummyStreams = []
for (let i = 0; i < 24; i++) {
	dummyStreams.push({
		streamLink: `streamLink ${i}`,
		descripion: `descripion ${i}`,
		imgUrl: `imgUrl ${i}`,
		donationGoal: i + 100,
		donationProgress: i + 100,
	})
}

fs.writeFileSync('../shedule.json', JSON.stringify(dummyStreams))
