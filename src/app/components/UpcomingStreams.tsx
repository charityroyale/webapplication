import React from 'react'
import {
	StyledKalenderDownloadLink,
	StyledPast,
	StyledUpcoming,
	StylePastStreamsHeader,
	StyleUpcomingStreamsHeader,
	StyleUpcomingStreamsTitle,
} from '../../styles/common.styles'
import useMakeAWish from '../hooks/useMakeAWish'
import { CmsUpcomingStreamer } from '../cms/cms'
import UpcomingStream from './UpcomingStream/UpcomingStream'
import { Text } from './Text'
import { MakeAWishWishDTO, MakeAWishStreamerJSONDTO } from '../dto/MakeAWishDonationsDTO'
import { styled } from '../../styles/Theme'

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
	const makeAWish = useMakeAWish()

	const getStreamEndDate = (stream: CmsUpcomingStreamer) => {
		const startDate = new Date(stream.date)
		const hoursToAdd = 12
		return new Date(startDate.getTime() + hoursToAdd * 3600000)
	}
	const now = new Date()
	const isInThePast = (stream: CmsUpcomingStreamer) => now > getStreamEndDate(stream)
	const isInTheFuture = (stream: CmsUpcomingStreamer) => now <= getStreamEndDate(stream)

	const createUpcomingStream = (stream: CmsUpcomingStreamer, index: number) => {
		let donationGoal = '0'
		let donationProgess = '0'
		if (!makeAWish.isError && !makeAWish.isLoading) {
			const rootLevelWish: MakeAWishWishDTO | undefined = makeAWish.data.wishes[stream.wishes[0]]
			const streamer: MakeAWishStreamerJSONDTO = makeAWish.data.streamers[stream.streamerChannel]

			if (rootLevelWish) {
				donationGoal = rootLevelWish.donation_goal
			}

			if (rootLevelWish && streamer.wishes && stream.wishes[0]) {
				donationProgess =
					streamer.type === 'main'
						? rootLevelWish.current_donation_sum
						: streamer.wishes[stream.wishes[0]].current_donation_sum
			}
		}
		return (
			<UpcomingStream
				projectDone={isInThePast(stream)}
				key={index}
				{...stream}
				donationProgress={donationProgess}
				donationGoal={donationGoal}
			/>
		)
	}

	const swapScheduleTypeButtonText = scheduleType === 'main' ? 'Main schedule' : 'Community schedule'

	return (
		<React.Fragment>
			{schedule.filter(isInTheFuture).length > 0 && (
				<>
					<StyleUpcomingStreamsHeader>
						<StyleUpcomingStreamsTitle>
							<Text content="scheduledStreamsTitle" />
							<ScheduleTypeButton
								onClick={(e) =>
									scheduleType === 'main' ? changeScheduleType('community') : changeScheduleType('main')
								}
							>
								{swapScheduleTypeButtonText}
							</ScheduleTypeButton>
						</StyleUpcomingStreamsTitle>
						<p>
							<Text content="downloadScheduleTitle" />{' '}
							<StyledKalenderDownloadLink aria-describedby="Programm als Kalender" href={`/calendar/all.ics`}>
								<Text content="downloadCTA" />
							</StyledKalenderDownloadLink>
							.
						</p>
					</StyleUpcomingStreamsHeader>
					<StyledUpcoming>{schedule.filter(isInTheFuture).map(createUpcomingStream)}</StyledUpcoming>
				</>
			)}
			{schedule.filter(isInThePast).length > 0 && (
				<>
					<StylePastStreamsHeader>
						<StyleUpcomingStreamsTitle>
							<Text content="pastStreamsTitle" />
						</StyleUpcomingStreamsTitle>
						<ScheduleTypeButton
							onClick={(e) => (scheduleType === 'main' ? changeScheduleType('community') : changeScheduleType('main'))}
						>
							{swapScheduleTypeButtonText}
						</ScheduleTypeButton>
					</StylePastStreamsHeader>

					<StyledPast>{schedule.filter(isInThePast).map(createUpcomingStream)}</StyledPast>
				</>
			)}
			{schedule.length === 0 && (
				<StylePastStreamsHeader>
					<StyleUpcomingStreamsTitle>Streams TBA</StyleUpcomingStreamsTitle>
					<ScheduleTypeButton
						onClick={(e) => (scheduleType === 'main' ? changeScheduleType('community') : changeScheduleType('main'))}
					>
						{swapScheduleTypeButtonText}
					</ScheduleTypeButton>
				</StylePastStreamsHeader>
			)}
		</React.Fragment>
	)
}

export default UpcomingFeatures
