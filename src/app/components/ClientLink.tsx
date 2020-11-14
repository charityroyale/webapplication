import Link from 'next/link'
import React from 'react'

interface ClientLinkProps {
	href: string
	children: React.ReactNode
	target?: string
}

const ClientLink: React.FunctionComponent<ClientLinkProps> = ({ children, href, target }: ClientLinkProps) => {
	return (
		<Link href={href}>
			<a href={href} target={target} rel={target === '_blank' ? 'noreferrer' : ''}>
				{children}
			</a>
		</Link>
	)
}

export default ClientLink
