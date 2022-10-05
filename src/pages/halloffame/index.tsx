import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Donor, DonorsResponse, useDonors } from '../../app/hooks/useDonors'
import MainLayout from '../../app/layouts/MainLayout'
import PageWithLayoutType from '../../app/types/PageWithLayout'
import { makeAWishAPI } from '../../config'
import { styled } from '../../styles/Theme'

interface InitialHallOfFameProps {
	donors: Donor[]
}

const HallOfFamePage: NextPage<InitialHallOfFameProps> = ({ donors }: InitialHallOfFameProps) => {
	const { donors: fromUseDonors, isLoadingDonors, isLoadingError } = useDonors()
	const [currentDonors, setCurrentDonors] = useState(donors)

	useEffect(() => {
		if (!isLoadingError && !isLoadingDonors && fromUseDonors.donors) {
			setCurrentDonors(fromUseDonors.donors)
		}
	}, [fromUseDonors, isLoadingDonors, isLoadingError])

	return (
		<>
			<Head>
				<title>Charity Royale | Hall Of Fame</title>
				<meta name="twitter:card" content="summary" key="twcard" />
				<meta name="twitter:site" content={'@CharityRoyale'} key="twsite" />
				<meta name="twitter:creator" content={'@CharityRoyale'} key="twcreator" />

				<meta property="og:url" content={'https://charityroyale.at/'} key="ogurl" />
				<meta
					property="og:image"
					content={'https://charityroyale.at/uploads/charity_royale_rgb_300x300.png'}
					key="ogimage"
				/>
				<meta property="og:image:width" content={'300'} key="ogimagewidth" />
				<meta property="og:image:height" content={'300'} key="ogimageheight" />
				<meta property="og:site_name" content={'Charity Royale'} key="ogsitename" />
				<meta property="og:title" content={'Charity Royale | Hall Of Fame'} key="ogtitle" />
				<meta property="og:type" content={'website'} key="ogtype" />
				<meta property="og:locale" content={'de_AT'} key="oglocale" />
				<meta property="fb:app_id" content={process.env.FB_ID} key="fbappid" />
				<meta
					property="og:description"
					content={'Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.'}
					key="ogdesc"
				/>
			</Head>
			<DonorsWrapper>
				{currentDonors.map((donor, i) => {
					return <span key={donor.username + i}>{donor.username}, </span>
				})}
			</DonorsWrapper>
		</>
	)
}

const DonorsWrapper = styled.div`
	max-width: 900px;
	color: white;
	word-break: break-all;
	margin: auto;
	line-height: 1.5;
`

export const getStaticProps: GetStaticProps<InitialHallOfFameProps> = async () => {
	try {
		const res = await fetch(makeAWishAPI.donorsURL)
		if (res.ok) {
			const data = (await res.json()) as DonorsResponse

			return {
				props: {
					donors: data.donors,
				},
			}
		} else {
			return {
				props: {
					donors: [],
				},
			}
		}
	} catch (e) {
		return {
			props: {
				donors: [],
			},
		}
	}
}
;((HallOfFamePage as unknown) as PageWithLayoutType).layout = MainLayout

export default HallOfFamePage
