import React, { FunctionComponent } from 'react'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import PageWithLayoutType from '../app/types/PageWithLayout'
import MainLayout from '../app/layouts/MainLayout'
import { styled } from '../styles/Theme'
import { ResponsiveVideo } from '../app/components/ResponsiveVideo'
import cmsContent, { FAQEntry, FAQVideoEntry } from '../app/cms/cms'
import ReactMarkdown from 'react-markdown'
import { Text } from '../app/components/Text'

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

const FaqContentHeader = styled.h2`
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

const FaqAnswer = styled.div`
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
			<FaqAnswer className="faq-answer">
				<ReactMarkdown>{answer}</ReactMarkdown>
			</FaqAnswer>
		</FaqQuestionBoxWrapper>
	)
}

interface InitialFaqProps {
	questions: FAQEntry[]
	videos: FAQVideoEntry[]
	featuredStream?: string
}

const FaqPage: NextPage<InitialFaqProps> = ({ questions, videos }: InitialFaqProps) => {
	return (
		<>
			<Head>
				<title>Charity Royale - FAQ</title>
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
				<meta property="og:title" content={'Charity Royale - FAQ'} key="ogtitle" />
				<meta property="og:type" content={'website'} key="ogtype" />
				<meta property="og:locale" content={'de_AT'} key="oglocale" />
				<meta property="fb:app_id" content={process.env.FB_ID} key="fbappid" />
				<meta
					property="og:description"
					content={'Größtes Stream,- und Gaming Charity Projekt Österreichs von Veni und willhaben.'}
					key="ogdesc"
				/>
			</Head>
			<FaqMainWrapper>
				<FaqVideoSection>
					{videos.map((video, i) => (
						<ResponsiveVideo key={i} url={video.url} title={video.name}></ResponsiveVideo>
					))}
				</FaqVideoSection>
				<FaqContentHeader>
					<Text content="faqPageTitle" />
				</FaqContentHeader>
				<FaqContenSection>
					{questions.map((question, i) => (
						<FaqQuestionBox key={i} question={question.question} answer={question.answer} />
					))}
				</FaqContenSection>
			</FaqMainWrapper>
		</>
	)
}

export const getStaticProps: GetStaticProps<InitialFaqProps> = async () => {
	return {
		props: {
			questions: cmsContent.faq.questions,
			videos: cmsContent.faq.videos,
			featuredStream: cmsContent.featuredStream,
			featuredDonationLink: cmsContent.customDonationLink || cmsContent.featuredStream,
		},
	}
}
;((FaqPage as unknown) as PageWithLayoutType).layout = MainLayout

export default FaqPage
