import React from 'react'
import { Heading } from '../../styles/common.styles'

interface TitleProps {
	text: string
}

const Title: React.FunctionComponent<TitleProps> = ({ text }: TitleProps) => {
	return <Heading>{text}</Heading>
}

export default Title
