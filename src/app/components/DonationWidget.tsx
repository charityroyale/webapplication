import React from 'react'
import { styled } from '../../styles/Theme'

interface DonationWidgetProps {
	title: string
	children: React.ReactNode
}

const StyledWidgetHeader = styled.p`
	background-color: ${(p) => p.theme.color.willhaben};
	text-align: center;
	padding: ${(p) => p.theme.space.m}px ${(p) => p.theme.space.l}px;
	text-transform: uppercase;
	letter-spacing: 1px;
	color: ${(p) => p.theme.color.white};
	border-top-right-radius: ${(p) => p.theme.space.xs}px;
	border-top-left-radius: ${(p) => p.theme.space.xs}px;
`

const StyledWidgetContent = styled.div`
	padding: ${(p) => p.theme.space.l}px ${(p) => p.theme.space.m}px;
`

const DonationWidget: React.FunctionComponent<DonationWidgetProps> = ({ title, children }: DonationWidgetProps) => {
	return (
		<React.Fragment>
			<StyledWidgetHeader>{title}</StyledWidgetHeader>
			<StyledWidgetContent>{children}</StyledWidgetContent>
		</React.Fragment>
	)
}

export default DonationWidget
