'use client'
import React from 'react'
import { FunctionComponent } from 'react'
import { DictionairyEntryType, useLanguageContext } from '../../provider/LanguageProvider'

export const Text: FunctionComponent<{ content: DictionairyEntryType }> = ({ content }) => {
	const languageContext = useLanguageContext()
	return <span>{languageContext.dictionary[content]}</span>
}
