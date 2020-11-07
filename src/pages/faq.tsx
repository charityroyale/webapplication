import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import PageWithLayoutType from '../app/types/PageWithLayout'
import MainLayout from '../app/layouts/MainLayout'

const FaqPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Charity Royale 2020 - Spenden</title>
			</Head>
			<React.Fragment>
				<iframe
					title="Veni FAQ"
					width="560"
					height="315"
					src="https://www.youtube.com/embed/6rFM6G9plxc"
					frameBorder="0"
					style={{ margin: 'auto' }}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
				<p style={{ margin: 'auto' }}>Wichtige Antworten auf wichtige Fragen</p>
			</React.Fragment>
		</>
	)
}

;(FaqPage as PageWithLayoutType).layout = MainLayout

export default FaqPage
