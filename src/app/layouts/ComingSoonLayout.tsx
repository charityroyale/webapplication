import React from 'react'
import { StyledWebsiteInProgress } from '../../styles/common.styles'

type ComingSoonLayoutProps = {
	children: React.ReactNode
}

const ComingSoonLayout: React.FunctionComponent<ComingSoonLayoutProps> = () => {
	return (
		<StyledWebsiteInProgress>
			<img width="250px" src="/Charity_Royale_RGB.png" alt="Charity Royale 2020" />
			<h1>Coming soon</h1>
		</StyledWebsiteInProgress>
	)
}

export default ComingSoonLayout
