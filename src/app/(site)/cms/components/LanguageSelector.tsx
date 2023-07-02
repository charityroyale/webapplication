'use client'
import React from 'react'
import { useLanguageContext, LanguageType, languageOptions } from '../../provider/LanguageProvider'
import { styled } from 'styled-components'

export const LanguageSelector = () => {
	const { language, updateLanguage } = useLanguageContext()

	const onBlur = (e: React.FocusEvent<HTMLSelectElement>) => updateLanguage(e.target.value as LanguageType)
	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => updateLanguage(e.target.value as LanguageType)

	return (
		<LanguageSelect onBlur={onBlur} onChange={onChange} value={language}>
			{Object.entries(languageOptions).map(([id, name]) => (
				<option key={id} value={id}>
					{name}
				</option>
			))}
		</LanguageSelect>
	)
}

const LanguageSelect = styled.select`
	font-size: ${(p) => p.theme.fontSize.m}px;
	background-color: ${(p) => p.theme.color.veniPurple};
	color: ${(p) => p.theme.color.white};
	padding: 5px;
	position: absolute;
	border: 1px solid transparent;
	bottom: -28px;

	${(p) => p.theme.media.phone} {
		bottom: -42px;
		font-size: ${(p) => p.theme.fontSize.l}px;
	}
	right: 0;
	letter-spacing: 0.75px;
`
