import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo'

import { AuthClient } from './AuthClient'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return <AuthClient />
}
