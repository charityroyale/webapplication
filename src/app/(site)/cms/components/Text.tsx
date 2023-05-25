'use client'
import React from 'react'
import { FunctionComponent, useContext } from 'react'
import { DictionairyEntryType, LanguageContext } from '../../provider/LanguageProvider'

// eslint-disable-next-line react/prop-types
export const Text: FunctionComponent<{ content: DictionairyEntryType }> = ({ content }) => {
	const languageContext = useContext(LanguageContext)
	return <span>{languageContext.dictionary[content]}</span>
}
