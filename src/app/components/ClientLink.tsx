import Link from 'next/link'
import React from 'react'

interface ClientLinkProps {
	href: string
	children: React.ReactNode
	target?: string
	ariaLabel?: string
}

const ClientLink: React.FunctionComponent<ClientLinkProps> = ({
	children,
	href,
	target,
	ariaLabel,
}: ClientLinkProps) => {
	return (
		<Link href={href}>
			<a href={href} aria-label={ariaLabel} target={target} rel={target === '_blank' ? 'noreferrer' : ''}>
				{children}
			</a>
		</Link>
	)
}

export default ClientLink
