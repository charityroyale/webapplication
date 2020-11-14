/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const fm = require('front-matter')
const ics = require('ics')

fs.readFile('./_posts/frontpage/charity-royale.md', 'utf8', function (err, data) {
	if (err) throw err

	const cmsContent = fm(data).attributes
	const upcomingStream = cmsContent.upcoming
	let calendarAll = []

	calendarAll = upcomingStream.map((stream) => {
		const startDate = new Date(stream.date)
		return {
			title: `Charity Royale 2020 - ${stream.streamerName}`,
			duration: { hours: 4 },
			description: stream.streamLink,
			start: [
				startDate.getFullYear(),
				startDate.getMonth() + 1,
				startDate.getDate(),
				startDate.getHours(),
				startDate.getMinutes(),
			],
		}
	})

	const calendarEvents = ics.createEvents(calendarAll)
	fs.writeFileSync(`${__dirname}/../public/calendar/all.ics`, calendarEvents.value)
})
