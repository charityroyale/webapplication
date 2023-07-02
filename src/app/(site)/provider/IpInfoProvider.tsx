'use client'
import React, { useEffect } from 'react'
import { createContext, FunctionComponent, useState } from 'react'

export interface IpInfoProviderContextProps {
	country: string
}

const defaultIpInfo: IpInfoProviderContextProps = {
	country: 'unknown',
}

interface IpInfoResponse {
	hostname: string
	ip: string
	city: string
	region: string
	country: string
	loc: string
	org: string
	postal: string
	timezone: string
}

export const IpInfoProviderContext = createContext<IpInfoProviderContextProps>(defaultIpInfo)
export const IpInfoProvider: FunctionComponent<React.PropsWithChildren> = ({ children }) => {
	const [ipInfo, setIpInfo] = useState<IpInfoProviderContextProps>(defaultIpInfo)

	useEffect(() => {
		const fetchIpInfo = async () => {
			try {
				const res = await fetch('https://ipinfo.io/json?token=d5295843873bf7')
				if (res.ok) {
					const jsonResponse = (await res.json()) as IpInfoResponse
					setIpInfo({
						country: jsonResponse.country,
					})
				}
			} catch {
				// fail silently
			}
		}

		fetchIpInfo()
	}, [])

	const provider = {
		country: ipInfo.country,
	}

	return <IpInfoProviderContext.Provider value={provider}>{children}</IpInfoProviderContext.Provider>
}
