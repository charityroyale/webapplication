'use client'
import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Donor, useDonors } from '../../../hooks/useDonors'

interface HallOfFameContentProps {
	donors: Donor[]
}

export const HallOfFameContent: FunctionComponent<HallOfFameContentProps> = ({ donors }) => {
	const { donors: fromUseDonors, isLoadingDonors, isLoadingError } = useDonors()
	const [currentDonors, setCurrentDonors] = useState(donors)

	useEffect(() => {
		if (!isLoadingError && !isLoadingDonors && fromUseDonors.donors) {
			setCurrentDonors(fromUseDonors.donors)
		}
	}, [fromUseDonors, isLoadingDonors, isLoadingError])

	return (
		<DonorsWrapper>
			{currentDonors.map((donor, i) => {
				if (donor.username === 'Anonym') {
					donor.username = donor.username + i
				}
				return <span key={donor.username + i}>{donor.username}, </span>
			})}
		</DonorsWrapper>
	)
}

const DonorsWrapper = styled.div`
	max-width: 900px;
	color: white;
	word-break: break-all;
	margin: auto;
	line-height: 1.5;
`
