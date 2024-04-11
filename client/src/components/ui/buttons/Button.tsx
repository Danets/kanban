import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
	children,
	className,
	...rest
}: PropsWithChildren<TypeButton>) {
	return (
		<button
			className={cn(
				'flex items-center gap-2.5 linear rounded-lg bg-cyan-500 border border-primary py-2 px-2 text-base font-medium transition hover:bg-primary focus:bg-primary active:bg-brand-700',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
