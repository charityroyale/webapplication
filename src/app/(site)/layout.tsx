import React, { PropsWithChildren } from 'react'
import { MainPageContent } from '../cms/components/MainPageContent'

const MainLayout: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
	return <MainPageContent>{children}</MainPageContent>
}

export default MainLayout
