import React, { FunctionComponent } from 'react'
import { GetStaticProps, NextPage } from 'next'
import cmsContent from '../../_posts/frontpage/charity-royale.md'
import Head from 'next/head'
import PageWithLayoutType from '../app/types/PageWithLayout'
import MainLayout from '../app/layouts/MainLayout'
import { styled } from '../styles/Theme'
import { ResponsiveVideo } from '../app/components/ResponsiveVideo'

const FaqMainWrapper = styled.div`
	margin: auto;
	display: grid;
	color: ${(p) => p.theme.color.white};
	grid-template-areas:
		'faq-video faq-video faq-video'
		'faq-header faq-header faq-header'
		'faq-content faq-content faq-content';
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
	grid-gap: ${(p) => p.theme.gridGrap.desktop}px;
	padding: 0 ${(p) => p.theme.space.l}px;

	${(p) => p.theme.media.tablet} {
		padding: 0 ${(p) => p.theme.space.l}px;
		grid-template-columns: 1fr 1fr;
		grid-gap: ${(p) => p.theme.gridGrap.tablet}px;
	}

	${(p) => p.theme.media.phone} {
		padding: 0 ${(p) => p.theme.space.xl}px;
		grid-template-columns: 1fr;
		grid-gap: ${(p) => p.theme.gridGrap.phone}px;
	}
`
const FaqContenSection = styled.div`
	grid-area: faq-content;
`
const FaqVideoSection = styled.div`
	grid-area: faq-video;
	display: grid;
	grid-gap: ${(p) => p.theme.space.xl}px;
	grid-template-columns: minmax(auto, 1fr) minmax(auto, 1fr);

	${(p) => p.theme.media.phone} {
		grid-template-columns: minmax(auto, 1fr);
	}
`

const FaqContentHeader = styled.h5`
	font-size: ${(p) => p.theme.fontSize.xl}px;
	grid-area: faq-header;
`

const FaqQuestionBoxWrapper = styled.div`
	margin-bottom: ${(p) => p.theme.space.m}px;
`

const FaqQuestion = styled.p`
	font-weight: 600;
	font-size: ${(p) => p.theme.fontSize.l}px;
	margin-bottom: ${(p) => p.theme.space.m}px;
`

const FaqAnswer = styled.p`
	font-size: ${(p) => p.theme.fontSize.m}px;
	margin-bottom: ${(p) => p.theme.space.m}px;
`

interface FaqQuestionBoxProps {
	question: string
	answer: string
}

const FaqQuestionBox: FunctionComponent<FaqQuestionBoxProps> = ({ question, answer }: FaqQuestionBoxProps) => {
	return (
		<FaqQuestionBoxWrapper>
			<FaqQuestion>{question}</FaqQuestion>
			<FaqAnswer>{answer}</FaqAnswer>
		</FaqQuestionBoxWrapper>
	)
}

const text =
	'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmodtempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam etusto duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolorsit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inviduntut labore et dolore magna aliquyam erat, sed diam voluptua.'

interface InitialFaqPageProps {
	featuredStream?: string
}

const FaqPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Charity Royale 2020 - Spenden</title>
			</Head>
			<FaqMainWrapper>
				<FaqVideoSection>
					<ResponsiveVideo url={'https://www.youtube-nocookie.com/embed/Vyfb7EzbJbQ'} title={'ss'}></ResponsiveVideo>
					<ResponsiveVideo url={'https://www.youtube-nocookie.com/embed/Vyfb7EzbJbQ'} title={'ss'}></ResponsiveVideo>
				</FaqVideoSection>
				<FaqContentHeader>Antworten und Fragen zum Projekt und spenden</FaqContentHeader>
				<FaqContenSection>
					<FaqQuestionBox question={'Wie spät ist es?'} answer={text} />
					<FaqQuestionBox question={'Wie spät ist es?'} answer={text} />
					<FaqQuestionBox question={'Wie spät ist es?'} answer={text} />
				</FaqContenSection>
			</FaqMainWrapper>
		</>
	)
}

;(FaqPage as PageWithLayoutType).layout = MainLayout

export const getStaticProps: GetStaticProps<InitialFaqPageProps> = async () => {
	const featuredStream = cmsContent.attributes.featuredStream
	return {
		props: { featuredStream },
	}
}
export default FaqPage
