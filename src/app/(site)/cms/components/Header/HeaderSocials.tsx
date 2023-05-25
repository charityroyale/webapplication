import React from 'react'
import { FaTwitter } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import styled from 'styled-components'

export const HeaderSocials = () => {
	return (
		<HeaderSocialsWrapper>
			<SocialIconLink href="https://twitter.com/CharityRoyale" target="_blank">
				<FaTwitter />
			</SocialIconLink>
			<SocialIconLink href="https://www.tiktok.com/@charityroyale" target="_blank">
				<FaTiktok />
			</SocialIconLink>
			<SocialIconLink href="https://www.instagram.com/charityroyale" target="_blank">
				<FaInstagram />
			</SocialIconLink>
		</HeaderSocialsWrapper>
	)
}

const SocialIconLink = styled.a``

const HeaderSocialsWrapper = styled.div`
	padding: 5px;
	position: absolute;
	left: 18px;
	bottom: -31px;
	display: flex;
	gap: 12px;
	font-size: ${(p) => p.theme.fontSize.l}px;

	${(p) => p.theme.media.phone} {
		bottom: -48px;
		left: 8px;
		font-size: ${(p) => p.theme.fontSize.xl}px;
	}
`
