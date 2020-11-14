import Link from 'next/link'
import React from 'react'
import { useIsSSR } from './isSSR'

interface SSRClientSideLinkProps {
	href: string
	children: React.ReactNode
	target?: string
}

const SSRClientSideLink: React.FunctionComponent<SSRClientSideLinkProps> = ({
	children,
	href,
	target,
}: SSRClientSideLinkProps) => {
	const isSSR = useIsSSR()
	return isSSR ? (
		<a href={href} target={target} rel={target === '_blank' ? 'noreferrer' : ''}>
			{children}
		</a>
	) : (
		<Link href={href}>
			<a href={href} target={target} rel={target === '_blank' ? 'noreferrer' : ''}>
				{children}
			</a>
		</Link>
	)
}

export default SSRClientSideLink
