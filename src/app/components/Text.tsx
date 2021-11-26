import { FunctionComponent, useContext } from 'react'
import { DictionairyEntryType, LanguageContext } from '../provider/LanguageProvider'

export const Text: FunctionComponent<{ content: DictionairyEntryType }> = ({ content }) => {
	const languageContext = useContext(LanguageContext)
	return languageContext.dictionary[content] || content
}
