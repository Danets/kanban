'use client'

import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/buttons/Button'

import { useThemeContext } from '@/app/ThemeProvider'
import { Theme } from '@/app/context/Theme.context'

export function Switcher() {
	const { toggleTheme, theme } = useThemeContext()
	const isLightTheme = theme === Theme.LIGHT

	return (
		<Button onClick={toggleTheme}>
			{isLightTheme ? <Moon /> : <Sun />}
			{isLightTheme ? 'Light' : 'Dark'}
		</Button>
	)
}
