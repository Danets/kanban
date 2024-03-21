import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo'

import { AdminClient } from './AdminClient'

export const metadata: Metadata = {
	title: 'Admin Page',
	...NO_INDEX_PAGE
}

export default function AdminPage() {
	return (
		<>
			<AdminClient />
		</>
	)
}
