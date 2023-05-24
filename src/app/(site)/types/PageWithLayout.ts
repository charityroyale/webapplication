import { NextPage } from 'next'
import DonationLayout from '../layouts/DonationLayout'
import MainLayout from '../layouts/MainLayout'

type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout }

type PageWithDonationMainLayoutType = NextPage & { layout: typeof DonationLayout }

type PageWithLayoutType = PageWithMainLayoutType | PageWithDonationMainLayoutType

export default PageWithLayoutType
