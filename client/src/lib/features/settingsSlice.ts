import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { TypeUserForm } from '@/types/auth.types'

import type { RootState } from '../store'

// Define a type for the slice state
interface SettingsState {
	settings: TypeUserForm
}

// Define the initial state using that type
const initialState: SettingsState = {
	settings: {
		name: '',
		email: '',
		password: '',
		workInterval: 45,
		breakInterval: 15,
		intervalCount: 7
	}
}

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		updateSettings: (state, action: PayloadAction<TypeUserForm>) => {
			state.settings = action.payload
		}
	}
})

export const { updateSettings } = settingsSlice.actions

export default settingsSlice.reducer
