'use client'

import { FC, useContext, useEffect, useState } from 'react'

import { Theme, ThemeContext } from './context/Theme.context'

export type ThemeProviderProps = {
	children: React.ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>(Theme.LIGHT)
	const [mounted, setMounted] = useState(false)

	const toggleTheme = () =>
		setTheme(oldTheme => (oldTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT))

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{mounted && <div className={theme}>{children}</div>}
		</ThemeContext.Provider>
	)
}

const useThemeContext = () => {
	const context = useContext(ThemeContext)

	if (context === undefined) {
		throw new Error(
			'useThemeContext must be used within a ThemeContextProvider'
		)
	}

	return context
}

export { ThemeProvider, useThemeContext }
