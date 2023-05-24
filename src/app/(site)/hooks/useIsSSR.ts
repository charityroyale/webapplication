import { useState, useEffect } from 'react'

export const useIsSSR = (): boolean => {
	const [isSSR, setIsSSR] = useState(true)
	useEffect(() => {
		setIsSSR(false)
	}, [])
	return isSSR
}
