import React from 'react'
import { styled } from '../../styles/Theme'
import ClientLink from './ClientLink'

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
		color: ${(p) => p.theme.color.royaleGold};
	}

	${(p) => p.theme.media.phone} {
		grid-template-areas:
			'footer-left . .'
			'footer-center . .'
			'footer-right footer-right .';
	}
`

const Footer: React.FunctionComponent<{ featuredStream: string }> = ({
	featuredStream,
}: {
	featuredStream: string
}) => {
	return (
		<StyledFooter>
			<FooterLeftGridItem>
				<FooterListTitle>Jetzt spenden</FooterListTitle>
				<FooterList>
					<FooterListItem>
						<ClientLink href={`/donate/${featuredStream}`}>Spenden</ClientLink>
					</FooterListItem>
					<FooterListItem>
						<ClientLink href={'/faq'}>FAQ</ClientLink>
					</FooterListItem>
				</FooterList>
			</FooterLeftGridItem>
			<FooterCenterGridItem>
				<FooterListTitle>Veranstalter</FooterListTitle>
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
				<FooterListTitle>Impressum</FooterListTitle>
				<FooterList>
					<FooterListItem>
						<a target="_bank" rel="noreferrer" href={'https://www.willhaben.at/iad/impressum'}>
							willhaben
						</a>
					</FooterListItem>
					<FooterListItem>
						willhaben internet service GmbH & Co KG <br /> Landstraßer Hauptstraße 97-101 <br /> Bürozentrum 1 1030 Wien
					</FooterListItem>
				</FooterList>
			</FooterRightGridItem>
		</StyledFooter>
	)
}

export default Footer
