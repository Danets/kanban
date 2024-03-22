'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'

export function LogoutButton() {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	return (
		<button
			className='flex gap-2.5 items-center px-layout py-1.5 mt-2 opacity-20 hover:opacity-100 transition-opacity duration-300'
			onClick={() => mutate()}
		>
			<LogOut size={20} />
			<span>Log Out</span>
		</button>
	)
}
