import React from 'react'
import { keyframes, styled } from 'styled-components'

interface ProgressBarProps {
	style: React.CSSProperties
	percent: number
}

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

const progressAnimation = (progress: number) => keyframes`
	0% {
		width: 12px;
		background-color: gold;
	}
	90% {
		width: ${progress}%;
		background-color: gold;
	}
	100% {
		width: ${progress}%;
		background-color: ${progress >= 100 ? 'green' : 'gold'};
	}
`

const ProgressBarContainer = styled.div`
	background-color: white;
	width: 100%;
	height: 12px;
	border-radius: 6px;
`
const Bar = styled.div<{ progress: number }>`
	min-width: 12px;
	height: 12px;
	border-radius: 6px;
	animation: ${(props) => progressAnimation(props.progress)} 400ms forwards ease-in-out;
`

export default ProgressBar
