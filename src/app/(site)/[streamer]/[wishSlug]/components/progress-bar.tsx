import React from 'react'
import { styled } from 'styled-components'

interface ProgressBarProps {
	style: React.CSSProperties
	percent: number
}

const ProgressBarContainer = styled.div`
	background-color: white;
	width: 100%;
	height: 12px;
	border-radius: 6px;
`
const Bar = styled.div<{ progress: number }>`
	background-color: ${(props) => (props.progress < 100 ? 'gold' : 'green')};
	width: ${(props) => props.progress}%;
	min-width: 12px;
	height: 12px;
	border-radius: 6px;
	transition: width 400ms ease-in-out;
`

/**
 * Normalizes a given percentage value to be between 0 and 100.
 * It basically caps values lower than 0 or higher than 100.
 *
 * @param percentage a not yet normalized percentage value that can exceed 100.
 * @returns a value between 0 and 100.
 */
function normalizePercentage(percentage: number): number {
	return Math.max(0, Math.min(percentage, 100))
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({ style, percent }: ProgressBarProps) => {
	const normalizedPercentage = normalizePercentage(percent)

	return (
		<ProgressBarContainer style={style}>
			<Bar progress={normalizedPercentage}></Bar>
		</ProgressBarContainer>
	)
}

export default ProgressBar
