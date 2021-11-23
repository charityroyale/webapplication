/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const fm = require('front-matter')
const ics = require('ics')

fs.readFile('./_cms/charity-royale.md', 'utf8', function (err, data) {
	if (err) throw err

	const cmsContent = fm(data).attributes
	const upcomingStream = cmsContent.upcoming
	let calendarAll = []

	calendarAll = upcomingStream.map((stream) => {
		const startDate = new Date(stream.date)
		const endDate = new Date(startDate)
		endDate.setUTCHours(23)
		return {
			title: `${stream.streamerName} - Charity Royale 2021`,
			description: stream.streamLink,
			start: [
				startDate.getFullYear(),
				startDate.getMonth() + 1,
				startDate.getDate(),
				startDate.getHours(),
				startDate.getMinutes(),
			],
			end: [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate(), endDate.getHours(), endDate.getMinutes()],
		}
	})

	const calendarEvents = ics.createEvents(calendarAll)

	const distUrl = `${__dirname}/../public/calendar/`
	const fileLocation = `${distUrl}/all.ics`

	if (!fs.existsSync(distUrl)) {
		fs.mkdirSync(distUrl)
	}
	fs.writeFileSync(fileLocation, calendarEvents.value ?? '')
})
