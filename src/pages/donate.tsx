import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import PageWithLayoutType from '../app/types/PageWithLayout'
import {
	StyledDonationFormIframe,
	StyledDonationSumWidget,
	StyledDonatorsWidget,
	StyledLatestDonatorssWidget,
} from '../styles/common.styles'
import DonationLayout from '../app/layouts/DonationLayout'
import DonationWidget from '../app/components/DonationWidget'
import DonationWidgetList from '../app/components/DonatorsWidgetList'
import DonationWidgetCount from '../app/components/DonationWidgetCount'
import DonationHeader from '../app/components/DonationHeader'

const highestDonatorsList = [
	{
		col_1: '1',
		col_2: 'Philos',
		col_3: '3.184,06',
	},
	{
		col_1: '2',
		col_2: 'FrufruTv',
		col_3: '1.760,56',
	},
	{
		col_1: '3',
		col_2: 'swissduayne1996',
		col_3: '1.419,97',
	},
	{
		col_1: '4',
		col_2: 'FreeSteyler01',
		col_3: '862,92',
	},
	{
		col_1: '5',
		col_2: 'Darina420',
		col_3: '530,12',
	},
]

const latestDonators = [
	{
		col_1: 'Mo 21:02',
		col_2: 'Philos',
		col_3: '103,88',
	},
	{
		col_1: 'Mo 09:53',
		col_2: 'FrufruTv',
		col_3: '50,00',
	},
	{
		col_1: 'So 19:23',
		col_2: 'swissduayne1996',
		col_3: '60,00',
	},
	{
		col_1: 'So 19:21',
		col_2: 'FreeSteyler01',
		col_3: '31,42',
	},
	{
		col_1: 'So 19:15',
		col_2: 'Darina420',
		col_3: '103,88',
	},
]

const DonatePage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Charity Royale 2020 - Spenden</title>
			</Head>

			<DonationHeader
				title={'Spendenprojekt: VeniCraft'}
				description={
					'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
				}
			/>

			<StyledDonationFormIframe src={'https://streamer.make-a-wish.at/'} title="Spendenformular" />

			<StyledDonationSumWidget>
				<DonationWidget title={'Spendensumme'}>
					<DonationWidgetCount current_amount={30} donation_goal_amount={100} />
				</DonationWidget>
			</StyledDonationSumWidget>
			<StyledDonatorsWidget>
				<DonationWidget title={'TOP-Spender'}>
					<DonationWidgetList list={highestDonatorsList} />
				</DonationWidget>
			</StyledDonatorsWidget>
			<StyledLatestDonatorssWidget>
				<DonationWidget title={'Letzte Spender'}>
					<DonationWidgetList list={latestDonators} />
				</DonationWidget>
			</StyledLatestDonatorssWidget>
		</>
	)
}

;(DonatePage as PageWithLayoutType).layout = DonationLayout

export default DonatePage
