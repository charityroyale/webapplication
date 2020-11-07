import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import PageWithLayoutType from '../app/types/PageWithLayout'
import MainLayout from '../app/layouts/MainLayout'
import { StyledDonationFormIframe } from '../styles/common.styles'

const DonatePage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Charity Royale 2020 - Spenden</title>
			</Head>
			<StyledDonationFormIframe
				src={'https://www.make-a-wish.at/spenden/'}
				title="Spendenformular"
			></StyledDonationFormIframe>
		</>
	)
}

;(DonatePage as PageWithLayoutType).layout = MainLayout

export default DonatePage
