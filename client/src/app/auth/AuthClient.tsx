'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export function AuthClient() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const [isLoginForm, setIsLoginForm] = useState(false)

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfully login!')
			reset()
			push(DASHBOARD_PAGES.HOME)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<div className='flex min-h-screen'>
			<form
				className='m-auto shadow bg-sidebar rounded-xl p-layout'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h3>Auth</h3>

				<Field
					id='email'
					label='Email:'
					placeholder='Enter email:'
					type='email'
					extra='mb-4'
					{...register('email', {
						required: 'Email is required!'
					})}
				/>
				{errors.email && <span>Email is required</span>}

				{!isLoginForm && (
					<Field
						id='name'
						label='Name:'
						placeholder='Enter name:'
						type='text'
						extra='mb-4'
						{...register('name')}
					/>
				)}

				<Field
					id='password'
					label='Password:'
					placeholder='Enter password:'
					type='password'
					extra='mb-6'
					{...register('password', {
						required: 'Password is required!'
					})}
				/>
				{errors.password && <span>Password is required</span>}

				<div className='flex items-center gap-5 justify-center'>
					<Button onClick={() => setIsLoginForm(true)}>Login</Button>
					<Button onClick={() => setIsLoginForm(false)}>Register</Button>
				</div>
			</form>
		</div>
	)
}
