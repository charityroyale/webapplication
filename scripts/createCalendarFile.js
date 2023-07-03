import { readFile, existsSync, mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import fm from 'front-matter'
import { createEvents } from 'ics'

const __dirname = path.resolve()
const cmsDataFileLocationPath = `${__dirname}/_cms/charity-royale.md`
const calendarPath = `${__dirname}/public/calendar/`
const calendarFileLocationPath = `${calendarPath}/all.ics`
const eventDuration = 23

readFile(cmsDataFileLocationPath, 'utf8', function (err, data) {
	if (err) throw err

	const calendar = getCalendarFromCms(data)
	const calendarWithEvents = createEvents(calendar)
	const calendarData = !calendarWithEvents.value ? '' : calendarWithEvents.value

	if (!existsSync(calendarPath)) {
		mkdirSync(calendarPath)
	}

	writeFileSync(calendarFileLocationPath, calendarData)
})

const getCalendarFromCms = (data) => {
	return fm(data).attributes.upcoming.map((stream) => {
		const startDate = new Date(stream.date)
		const endDate = startDate
		endDate.setUTCHours(eventDuration)

		return {
			title: `${stream.streamerName} - Charity Royale`,
			description: stream.streamLink,
			start: dateToNumberArray(startDate),
			end: dateToNumberArray(endDate),
		}
	})
}

const dateToNumberArray = (date) => {
	return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()]
}
