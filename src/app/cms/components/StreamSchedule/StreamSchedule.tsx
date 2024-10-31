'use client'
import React, { useState, useCallback } from 'react'

import { useMakeAWish } from '../../../hooks/useMakeAWish'
import { StreamerType, CmsUpcomingStreamer } from '../../cms'
import UpcomingStream from './UpcomingStream'
import { Text } from '../../components/Text'
import { styled } from 'styled-components'
import { MakeAWishRootLevelWishDTO, MakeAWishStreamerWishDTO } from '../../../dto/MakeAWishDTOs'
import { sortByDateString } from '../../../utils/commonUtils'
import { CmsSchedulesType } from '../../../(site)/page'
import {
	StyleUpcomingStreamsHeader,
	StyleUpcomingStreamsTitle,
	StyledKalenderDownloadLink,
	StyledUpcoming,
	StylePastStreamsHeader,
	StyledPast,
	StyleSpecialEventsHeader,
	StyledSpecialEventsGrid,
	StyledSpecialEvent,
} from '../../../../styles/common.styles'
import { LiveChannels } from './LiveChannels'
import { useLiveChannels } from '../../../hooks/useLiveChannels'
import { isMultiStream } from '../../../utils/streamerUtils'

interface StreamScheduleProps {
	schedules: CmsSchedulesType
}

export const StreamSchedule: React.FunctionComponent<StreamScheduleProps> = ({ schedules }: StreamScheduleProps) => {
	const { makeAWishData, makeAWishDataIsLoading, makeAWishDataIsError } = useMakeAWish()
	const [scheduleType, setScheduleType] = useState<StreamerType>('main')

	const createUpcomingStream = (stream: CmsUpcomingStreamer, index: number) => {
		let donationProgess = '0'
		if (!makeAWishDataIsError && !makeAWishDataIsLoading) {
			const rootLevelWishesForStreamer = stream.wishes.map((wishSlug) => makeAWishData.wishes[wishSlug])
			const mawStreamerData = makeAWishData.streamers[stream.streamerChannel]

			// calc donation progress
			if (mawStreamerData && rootLevelWishesForStreamer[0] && mawStreamerData.wishes && stream.wishes[0]) {
				// whitelist of accumulated total donations per project
				if (isMultiStream(stream.streamerChannel)) {
					// total sum of donations for a wish
					donationProgess = calcDonationProgressOfWishArray(rootLevelWishesForStreamer).toString()
					// streamer specific accumulated donations
				} else if (!Array.isArray(mawStreamerData.wishes)) {
					donationProgess = calcDonationProgressOfAllWishEntries(mawStreamerData.wishes).toString()
				} else {
					// fallback
					donationProgess = '0'
				}
			}
		}
		return (
			<UpcomingStream
				$projectdone={isInThePast(stream)}
				key={`${stream.streamerChannel}-${index}-stream`}
				{...stream}
				donationProgress={donationProgess}
			/>
		)
	}

	const futureStreamsSorted = schedules[scheduleType].filter(isInTheFuture).sort(sortByDateString)
	const pastStreamsSorted = schedules[scheduleType].filter(isInThePast).sort(sortByDateString)

	const changeScheduleTypeOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		setScheduleType(e.currentTarget.value as StreamerType)
	}, [])

	const { liveChannelsData } = useLiveChannels()

	return (
		<React.Fragment>
			{liveChannelsData.length > 0 && <LiveChannels />}
			<React.Fragment>
				<StyleSpecialEventsHeader>
					<StyleUpcomingStreamsTitle>
						<Text content="specialEventsTitle" />
					</StyleUpcomingStreamsTitle>
					<p>
						<Text content="specialEventsDescription" />{' '}
					</p>
					<StyledSpecialEventsGrid>
						<StyledSpecialEvent $bg="/specials/mc.jpg">
							<div>
								<p>
									<strong>Minecraft Rivals</strong>
								</p>
								<p>01.11, 18:00</p>
								<p>
									<a href="https://www.twitch.tv/derbanko" target="_blank" rel="noreferrer">
										twitch.tv/derbanko
									</a>
								</p>
							</div>
						</StyledSpecialEvent>
						<StyledSpecialEvent $bg="/specials/kochshow.png">
							<div>
								<p>
									<strong>Kochshow</strong>
								</p>
								<p>08.11</p>
								<p>
									<a href="https://www.twitch.tv/chef_jan" target="_blank" rel="noreferrer">
										twitch.tv/chef_jan
									</a>
								</p>
							</div>
						</StyledSpecialEvent>
						<StyledSpecialEvent $bg="/uploads/charity_royale_rgb_300x300.png"></StyledSpecialEvent>
						<StyledSpecialEvent $bg="/uploads/charity_royale_rgb_300x300.png"></StyledSpecialEvent>
					</StyledSpecialEventsGrid>
				</StyleSpecialEventsHeader>

				<StyleUpcomingStreamsHeader>
					<StyleUpcomingStreamsTitle>
						<Text content="scheduledStreamsTitle" />
					</StyleUpcomingStreamsTitle>
					<p>
						<Text content="downloadScheduleTitle" />{' '}
						<StyledKalenderDownloadLink aria-describedby="Programm als Kalender" href={`/calendar/all.ics`}>
							<Text content="downloadCTA" />
						</StyledKalenderDownloadLink>
						.
					</p>
					<ScheduleTypeGrid>
						<ScheduleTypeButton
							value="main"
							onClick={changeScheduleTypeOnClick}
							$isActive={scheduleType === 'main'}
						>
							Main
							<span>
								{schedules['main'].length > 0 ? `${schedules['main'].length} Streams` : 'Streams TBA'}
							</span>
						</ScheduleTypeButton>
						<div></div>
						<ScheduleTypeButton
							value="community"
							onClick={changeScheduleTypeOnClick}
							$isActive={scheduleType === 'community'}
						>
							Community
							<span>
								{schedules['community'].length > 0
									? `${schedules['community'].length} Streams`
									: 'Streams TBA'}
							</span>
						</ScheduleTypeButton>
					</ScheduleTypeGrid>
				</StyleUpcomingStreamsHeader>
				<StyledUpcoming>{futureStreamsSorted.map(createUpcomingStream)}</StyledUpcoming>
			</React.Fragment>

			{pastStreamsSorted.length > 0 && (
				<React.Fragment>
					<StylePastStreamsHeader>
						<StyleUpcomingStreamsTitle>
							<Text content="pastStreamsTitle" />
						</StyleUpcomingStreamsTitle>
						{!(futureStreamsSorted.length > 0) && (
							<ScheduleTypeGrid>
								<ScheduleTypeButton
									value="main"
									onClick={changeScheduleTypeOnClick}
									$isActive={scheduleType === 'main'}
								>
									Main
								</ScheduleTypeButton>
								<div></div>
								<ScheduleTypeButton
									value="community"
									onClick={changeScheduleTypeOnClick}
									$isActive={scheduleType === 'community'}
								>
									Community
								</ScheduleTypeButton>
							</ScheduleTypeGrid>
						)}
					</StylePastStreamsHeader>

					<StyledPast>{pastStreamsSorted.map(createUpcomingStream)}</StyledPast>
				</React.Fragment>
			)}
			{schedules[scheduleType].length === 0 && (
				<StylePastStreamsHeader>
					<StyleUpcomingStreamsTitle>Streams TBA</StyleUpcomingStreamsTitle>
				</StylePastStreamsHeader>
			)}
		</React.Fragment>
	)
}

const calcDonationProgressOfWishArray = (wishes: MakeAWishRootLevelWishDTO[]) => {
	let sum = 0
	wishes.map((wish) => (sum += Number(wish.current_donation_sum_net)))
	return sum
}

const calcDonationProgressOfAllWishEntries = (wishes: { [wishSlug: string]: MakeAWishStreamerWishDTO }) => {
	let sum = 0
	for (const [key] of Object.entries(wishes)) {
		sum += Number(wishes[key].current_donation_sum_net)
	}
	return sum
}

const getStreamEndDate = (stream: CmsUpcomingStreamer) => {
	const startDate = new Date(stream.date).getTime()
	const hoursToAdd = 13
	return startDate + hoursToAdd * 3600000
}
const isInThePast = (stream: CmsUpcomingStreamer) => Date.now() > getStreamEndDate(stream)
const isInTheFuture = (stream: CmsUpcomingStreamer) => Date.now() <= getStreamEndDate(stream)

const ScheduleTypeButton = styled.button<{ $isActive: boolean }>`
	padding: ${(p) => p.theme.space.l}px ${(p) => p.theme.space.m}px;
	border: 2px solid ${(p) => p.theme.color.charityTeal};
	background-color: ${(p) => p.theme.color.veniPurple};
	color: ${(p) => p.theme.color.white};
	display: flex;
	justify-content: center;
	flex-direction: column;
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

	& > span {
		font-size: ${(p) => p.theme.fontSize.s}px;
	}

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

	${(p) =>
		p.$isActive
			? `color: ${p.theme.color.veniPurple};
		border-image-source: linear-gradient(
			to right,
			${p.theme.color.charityTeal},
			${p.theme.color.charityTeal}
		);
		background-color: ${p.theme.color.charityTeal};
		cursor: pointer;`
			: ''}
`

const ScheduleTypeGrid = styled.div`
	grid-area: header;
	justify-content: center;
	display: grid;
	grid-gap: 28px;
	padding: 36px 24px 0 24px;
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
`
