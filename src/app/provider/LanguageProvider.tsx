import React from 'react'
import { createContext, FunctionComponent, useState } from 'react'
import en from '../languages/en.json'
import de from '../languages/de.json'

export interface DictionairyEntry {
	donationButtonText: string
}

export type DictionairyEntryType =
	| 'donationButtonText'
	| 'totalDonationsProgress'
	| 'totalDonationsSum'
	| 'totalDonatorsCount'
	| 'totalDonationGoal'
	| 'questionsAndAnswersCTA'
	| 'applyAsStreamerCTA'
	| 'donateNowText'
	| 'organizersTitle'
	| 'imprintTitle'
	| 'privacyPolicyTitle'
	| 'viennaText'

type LanguageTypes = 'en' | 'de'
type LanguageDictionairyType = { [key in LanguageTypes]: DictionairyEntry }

export const dictionaryList: LanguageDictionairyType = { en, de }
export const languageOptions = {
	en: 'English',
	de: 'Deutsch',
}

export interface LanguageContextProps {
	language: string
	dictionary: DictionairyEntry
	updateLanguage: React.Dispatch<React.SetStateAction<string>> | null
}

const detaultLanguage: LanguageContextProps = {
	language: 'de',
	dictionary: dictionaryList.en,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	updateLanguage: () => {},
}

export const LanguageContext = createContext<LanguageContextProps>(detaultLanguage)
export const LanguageProvider: FunctionComponent = ({ children }) => {
	const [language, setLanguage] = useState('de')

	const provider = {
		language,
		dictionary: dictionaryList[language],
		updateLanguage: (selected: 'en' | 'de') => {
			setLanguage(languageOptions[selected] ? selected : 'en')
		},
	}

	return <LanguageContext.Provider value={provider}>{children}</LanguageContext.Provider>
}
