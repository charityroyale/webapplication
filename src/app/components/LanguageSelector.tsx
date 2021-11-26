import React, { useContext } from 'react'
import { LanguageContext, languageOptions } from '../provider/LanguageProvider'

export const LanguageSelector = () => {
	const { language, updateLanguage } = useContext(LanguageContext)

	const handleLanguageChange = (e: React.FocusEvent<HTMLSelectElement>) => updateLanguage(e.target.value)

	return (
		<select onBlur={handleLanguageChange} onChange={handleLanguageChange} value={language}>
			{Object.entries(languageOptions).map(([id, name]) => (
				<option key={id} value={id}>
					{name}
				</option>
			))}
		</select>
	)
}
