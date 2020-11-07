import { NextPage } from 'next'
import MainLayout from '../layouts/MainLayout'

type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout }

type PageWithLayoutType = PageWithMainLayoutType

export default PageWithLayoutType
