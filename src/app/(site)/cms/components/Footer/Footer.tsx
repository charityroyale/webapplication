'use client'
import React from 'react'
import ClientLink from '../ClientLink'
import { Text } from '../Text'
import { AiFillHeart } from 'react-icons/ai'
import { cmsFeaturedStreamLink } from '../../cms'
import { styled } from '../../../../../styles/Theme'

const FooterListTitle = styled.p`
	margin-bottom: ${(p) => p.theme.fontSize.m}px;
	font-weight: 500;
	text-transform: uppercase;
`

const FooterListItem = styled.li`
	&:not(:last-child) {
		margin-bottom: ${(p) => p.theme.space.s}px;
	}
`

const FooterList = styled.ul`
	list-style: none;
`

const FooterLeftGridItem = styled.div`
	grid-area: footer-left;

	& > p:not(:first-child) {
		margin-top: 14px;
	}
`

const FooterCenterGridItem = styled.div`
	grid-area: footer-center;
`

const FooterRightGridItem = styled.div`
	text-align: right;
	grid-area: footer-right;

	${(p) => p.theme.media.phone} {
		text-align: left;
	}
`

const StyledFooter = styled.footer`
	display: grid;
	margin-top: 56px;
	padding: 56px 24px 56px 24px;
	grid-area: footer;
	justify-content: center;
	grid-gap: ${(p) => p.theme.gridGrap.desktop}px;
	grid-template-areas: 'footer-left footer-center footer-right';
	grid-template-columns: minmax(auto, 300px) minmax(auto, 300px) minmax(auto, 300px);
	color: ${(p) => p.theme.color.white};

	a {
		color: ${(p) => p.theme.color.charityTeal};
	}

	${(p) => p.theme.media.phone} {
		grid-template-areas:
			'footer-left . .'
			'footer-center . .'
			'footer-right footer-right .';
	}
`

const Footer: React.FunctionComponent = () => {
	return (
		<StyledFooter>
			<FooterLeftGridItem>
				<FooterListTitle>
					<Text content="donateNowText" />
				</FooterListTitle>
				<FooterList>
					<FooterListItem>
						<ClientLink href={cmsFeaturedStreamLink}>
							<Text content="donateText" />
						</ClientLink>
					</FooterListItem>
					<FooterListItem>
						<ClientLink href={'/faq'}>FAQ</ClientLink>
					</FooterListItem>
				</FooterList>
				<FooterListTitle style={{ display: 'flex' }}>
					WE <AiFillHeart aria-label="heart" size={20} color={'red'} style={{ margin: '0 1px 0 2px' }} />
					Open Source
				</FooterListTitle>
				<FooterList>
					<FooterListItem>
						<ClientLink href={'https://github.com/charityroyale'}>Code</ClientLink>
					</FooterListItem>
				</FooterList>
			</FooterLeftGridItem>
			<FooterCenterGridItem>
				<FooterListTitle>
					<Text content="organizersTitle" />
				</FooterListTitle>
				<FooterList>
					<FooterListItem>
						<a target="_bank" rel="noreferrer" href={'https://willhaben.at/'}>
							willhaben
						</a>
					</FooterListItem>
					<FooterListItem>
						<a target="_bank" rel="noreferrer" href={'https://www.make-a-wish.at/'}>
							Make-A-Wish
						</a>
					</FooterListItem>
					<FooterListItem>
						<a target="_bank" rel="noreferrer" href={'https://twitter.com/Venitroll'}>
							Veni
						</a>
					</FooterListItem>
				</FooterList>
			</FooterCenterGridItem>
			<FooterRightGridItem>
				<FooterListTitle>
					<Text content="imprintTitle" />
				</FooterListTitle>
				<FooterList>
					<FooterListItem>
						<a target="_bank" rel="noreferrer" href={'https://www.willhaben.at/iad/impressum'}>
							willhaben
						</a>
					</FooterListItem>
					<FooterListItem>
						<a target="_bank" rel="noreferrer" href={'https://www.willhaben.at/iad/datenschutzerklaerung'}>
							<Text content="privacyPolicyTitle" />
						</a>
					</FooterListItem>
					<FooterListItem>
						willhaben internet service GmbH & Co KG <br /> Landstraßer Hauptstraße 97-101 <br /> Bürozentrum
						1 1030 <Text content="viennaText" />
					</FooterListItem>
				</FooterList>
			</FooterRightGridItem>
		</StyledFooter>
	)
}

export default Footer
