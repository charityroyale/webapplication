import React from 'react'
import styled from 'styled-components'

const StyledInternetExplorerNotSupported = styled.div`
	background-color: ${(p) => p.theme.color.willhaben};
	color: ${(p) => p.theme.color.decentBeton};
	height: 100vh;
	width: 100%;
	text-align: center;
	padding: 100px 24px 0px;
`

const InternetExplorerNotSupported: React.FunctionComponent = () => {
	return (
		<StyledInternetExplorerNotSupported>
			<img width="225px" src="/Charity_Royale_RGB.png" alt="Charity Royale 2020" />
			<h1>Bitte nutze einen anderen Browser.</h1>
			<p>
				<strong>Internet Explorer</strong> wird{' '}
				<strong>
					<a
						href="https://www.microsoft.com/de-at/microsoft-365/windows/end-of-ie-support"
						target={'_blank'}
						rel="noreferrer"
					>
						nicht mehr weiterentwickelt
					</a>
					,
				</strong>
				<br />
				Microsoft empfiehlt die Nutzung von <strong>Microsoft Edge</strong>.
			</p>
		</StyledInternetExplorerNotSupported>
	)
}

export default InternetExplorerNotSupported
