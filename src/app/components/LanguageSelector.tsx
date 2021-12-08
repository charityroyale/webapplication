import React, { useContext } from 'react'
import { LanguageContext, languageOptions, LanguageType } from '../provider/LanguageProvider'

export const LanguageSelector = () => {
	const { language, updateLanguage } = useContext(LanguageContext)

	const onBlur = (e: React.FocusEvent<HTMLSelectElement>) => updateLanguage(e.target.value as LanguageType)
	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => updateLanguage(e.target.value as LanguageType)

	return (
		<select onBlur={onBlur} onChange={onChange} value={language}>
			{Object.entries(languageOptions).map(([id, name]) => (
				<option key={id} value={id}>
					{name}
				</option>
			))}
		</select>
	)
}
