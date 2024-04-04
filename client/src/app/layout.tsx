import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

import { SITE_NAME } from '@/constants/seo'

import { QueryProvider } from './QueryProvider'
import { StoreProvider } from './StoreProvider'
import './globals.scss'

const noto = Noto_Sans({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--font-zen',
	style: ['normal']
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Kanban application for planning daily routine'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={noto.className}>
				<StoreProvider>
					<QueryProvider>
						{children}

						<Toaster
							theme='dark'
							position='bottom-right'
							duration={1500}
						/>
					</QueryProvider>
				</StoreProvider>
			</body>
		</html>
	)
}
