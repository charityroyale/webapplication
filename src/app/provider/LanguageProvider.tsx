'use client'
import React, { useContext } from 'react'
import { createContext, FunctionComponent, useState } from 'react'
import en from '../languages/en.json'
import de from '../languages/de.json'

export type DictionairyEntryType =
	| 'donateText'
	| 'totalDonationsProgress'
	| 'totalDonationsSum'
	| 'totalDonatorsCount'
	| 'totalDonationGoal'
	| 'questionsAndAnswersCTA'
	| 'mawCta'
	| 'streamerContributionText'
	| 'applyAsStreamerCTA'
	| 'donateNowText'
	| 'organizersTitle'
	| 'imprintTitle'
	| 'privacyPolicyTitle'
	| 'viennaText'
	| 'cookieDescription'
	| 'cookieAcceptCTA'
	| 'cookieDeclineCTA'
	| 'donateForStreamerNowText'
	| 'wishByHeartTitle'
	| 'wishTitle'
	| 'donationWidgetGoalReachedTitle'
	| 'donationWidgetGoalReachedTextPart1'
	| 'donationWidgetGoalReachedTextPart2'
	| 'donationWidgetGoalReachedTextPart3'
	| 'taxDeductionHint'
	| 'specialEventsDescription'
	| 'specialEventsTitle'
	| 'scheduledStreamsTitle'
	| 'downloadScheduleTitle'
	| 'downloadCTA'
	| 'pastStreamsTitle'
	| 'liveChannelsTitle'
	| 'topDonatorText'
	| 'topDonatorItemText'
	| 'hereCouldYourNameTextPart1'
	| 'hereCouldYourNameTextPart2'
	| 'donationOverViewText'
	| 'donationPrependText'
	| 'donationGoal'
	| 'donatorNameText'
	| 'donationformTitle'
	| 'donationFormLoadErrorText'
	| 'latestDonatorsTitle'
	| 'faqPageTitle'
	| 'donationProjectTitle'

export type LanguageType = 'en' | 'de'
type LanguageDictionairyType = { [key in LanguageType]: { [key in DictionairyEntryType]: string } }

export const dictionaryList: LanguageDictionairyType = { en, de }
export const languageOptions = {
	en: 'English',
	de: 'Deutsch',
}

export interface LanguageContextProps {
	language: string
	dictionary: { [key in DictionairyEntryType]: string }
	updateLanguage: React.Dispatch<React.SetStateAction<LanguageType>>
}

const detaultLanguage: LanguageContextProps = {
	language: 'de',
	dictionary: dictionaryList.de,
	updateLanguage: () => {},
}

const LanguageContext = createContext<LanguageContextProps>(detaultLanguage)
export const useLanguageContext = () => useContext(LanguageContext)
export const LanguageProvider: FunctionComponent<React.PropsWithChildren> = ({ children }) => {
	const [language, setLanguage] = useState<LanguageType>('de')

	const provider = {
		language,
		dictionary: dictionaryList[language],
		updateLanguage: setLanguage,
	}

	return <LanguageContext.Provider value={provider}>{children}</LanguageContext.Provider>
}
