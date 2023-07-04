import { useLayoutEffect, useEffect } from 'react'
//medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
export default useIsomorphicLayoutEffect
