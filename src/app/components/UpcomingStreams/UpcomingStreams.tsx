import React, { useCallback } from 'react'
import {
	StyledKalenderDownloadLink,
	StyledPast,
	StyledUpcoming,
	StylePastStreamsHeader,
	StyleUpcomingStreamsHeader,
	StyleUpcomingStreamsTitle,
} from '../../../styles/common.styles'
import { useMakeAWish } from '../../hooks/useMakeAWish'
import { CmsUpcomingStreamer } from '../../cms/cms'
import UpcomingStream from './UpcomingStream'
import { Text } from '../Text'
import { MakeAWishWishDTO, MakeAWishStreamerJSONDTO, MakeAwishInfoJsonWishDTO } from '../../dto/MakeAWishDonationsDTO'
import { styled } from '../../../styles/Theme'
import { sortByDateString } from '../../utils/commonUtils'

const ScheduleTypeButton = styled.button`
	margin: ${(p) => p.theme.space.s}px auto;
	padding: ${(p) => p.theme.space.l}px ${(p) => p.theme.space.m}px;
	border: 2px solid ${(p) => p.theme.color.charityTeal};
	background-color: ${(p) => p.theme.color.veniPurple};
	color: ${(p) => p.theme.color.white};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${(p) => p.theme.fontSize.l}px;
	font-weight: 600;
	transition: background-color 0.17s;

	border: 10px solid;
	border-width: 3px;
	border-image-slice: 1;
	border-image-source: linear-gradient(
		to right,
		${(p) => p.theme.color.charityTeal},
		${(p) => p.theme.color.charityPink}
	);
	box-shadow: 4px 4px 3px 1px #000000;

	&:hover,
	&:focus {
		color: ${(p) => p.theme.color.veniPurple};
		border-image-source: linear-gradient(
			to right,
			${(p) => p.theme.color.charityTeal},
			${(p) => p.theme.color.charityTeal}
		);
		background-color: ${(p) => p.theme.color.charityTeal};
		cursor: pointer;
	}
`

interface UpcomingStreams {
	schedule: CmsUpcomingStreamer[]
	scheduleType: 'main' | 'community'
	changeScheduleType: React.Dispatch<React.SetStateAction<'main' | 'community'>>
}

const UpcomingFeatures: React.FunctionComponent<UpcomingStreams> = ({
	schedule,
	scheduleType,
	changeScheduleType,
}: UpcomingStreams) => {
	const { makeAWishData, makeAWishDataIsLoading, makeAWishDataIsError } = useMakeAWish()

	const getStreamEndDate = (stream: CmsUpcomingStreamer) => {
		const startDate = new Date(stream.date)
		const hoursToAdd = 12
		return new Date(startDate.getTime() + hoursToAdd * 3600000)
	}
	const now = new Date()
	const isInThePast = (stream: CmsUpcomingStreamer) => now > getStreamEndDate(stream)
	const isInTheFuture = (stream: CmsUpcomingStreamer) => now <= getStreamEndDate(stream)

	const createUpcomingStream = (stream: CmsUpcomingStreamer, index: number) => {
		let donationProgess = '0'
		if (!makeAWishDataIsError && !makeAWishDataIsLoading) {
			const rootLevelWishesForStreamer = stream.wishes.map((wishSlug) => makeAWishData.wishes[wishSlug])
			const mawStreamerData: MakeAWishStreamerJSONDTO = makeAWishData.streamers[stream.streamerChannel]

			// calc donation progress
			if (rootLevelWishesForStreamer[0] && mawStreamerData.wishes && stream.wishes[0]) {
				if (mawStreamerData.type === 'main') {
					donationProgess = calcDonationProgressOfWishArray(rootLevelWishesForStreamer).toString()
				} else if (mawStreamerData.wishes) {
					donationProgess = calcDonationProgressOfAllWishEntries(mawStreamerData.wishes).toString()
				} else {
					donationProgess = '0'
				}
			}
		}
		return (
			<UpcomingStream projectDone={isInThePast(stream)} key={index} {...stream} donationProgress={donationProgess} />
		)
	}

	const swapScheduleTypeButtonText = scheduleType === 'main' ? 'Main schedule' : 'Community schedule'

	const futureStreamsSorted = schedule.filter(isInTheFuture).sort(sortByDateString)
	const pastStreamsSorted = schedule.filter(isInThePast).sort(sortByDateString)

	const changeScheduleTypeOnClick = useCallback(() => {
		scheduleType === 'main' ? changeScheduleType('community') : changeScheduleType('main')
	}, [scheduleType, changeScheduleType])

	return (
		<React.Fragment>
			{futureStreamsSorted.length > 0 && (
				<>
					<StyleUpcomingStreamsHeader>
						<StyleUpcomingStreamsTitle>
							<Text content="scheduledStreamsTitle" />
							<ScheduleTypeButton onClick={changeScheduleTypeOnClick}>{swapScheduleTypeButtonText}</ScheduleTypeButton>
						</StyleUpcomingStreamsTitle>
						<p>
							<Text content="downloadScheduleTitle" />{' '}
							<StyledKalenderDownloadLink aria-describedby="Programm als Kalender" href={`/calendar/all.ics`}>
								<Text content="downloadCTA" />
							</StyledKalenderDownloadLink>
							.
						</p>
					</StyleUpcomingStreamsHeader>
					<StyledUpcoming>{futureStreamsSorted.map(createUpcomingStream)}</StyledUpcoming>
				</>
			)}
			{pastStreamsSorted.length > 0 && (
				<>
					<StylePastStreamsHeader>
						<StyleUpcomingStreamsTitle>
							<Text content="pastStreamsTitle" />
						</StyleUpcomingStreamsTitle>
						<ScheduleTypeButton onClick={changeScheduleTypeOnClick}>{swapScheduleTypeButtonText}</ScheduleTypeButton>
					</StylePastStreamsHeader>

					<StyledPast>{pastStreamsSorted.map(createUpcomingStream)}</StyledPast>
				</>
			)}
			{schedule.length === 0 && (
				<StylePastStreamsHeader>
					<StyleUpcomingStreamsTitle>Streams TBA</StyleUpcomingStreamsTitle>
					<ScheduleTypeButton onClick={changeScheduleTypeOnClick}>{swapScheduleTypeButtonText}</ScheduleTypeButton>
				</StylePastStreamsHeader>
			)}
		</React.Fragment>
	)
}

const calcDonationProgressOfWishArray = (wishes: MakeAWishWishDTO[] | MakeAwishInfoJsonWishDTO[]) => {
	let sum = 0
	wishes.map((wish) => (sum += Number(wish.current_donation_sum)))
	return sum
}

const calcDonationProgressOfAllWishEntries = (wishes: { [wishSlug: string]: MakeAWishWishDTO }) => {
	let sum = 0
	for (const [key] of Object.entries(wishes)) {
		sum += Number(wishes[key].current_donation_sum)
	}
	return sum
}

export default UpcomingFeatures
