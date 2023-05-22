const fs = require('fs')

const dummyStreams = []
for (let i = 0; i < 24; i++) {
	dummyStreams.push({
		streamLink: `#`,
		descripion: `descripion ${i}`,
		imgUrl: `Charity_Royale_RGB.png`,
		donationGoal: i + 100,
		donationProgress: i + 100,
		date: new Date(),
	})
}

fs.writeFileSync('../shedule.json', JSON.stringify(dummyStreams))
