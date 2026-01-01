import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Profile } from '../../core/interfaces';

const MOCK_DATA: Profile = {
	firstName: 'John',
	lastName: 'Doe',
	fullName: 'John Doe',
	title: 'Senior Frontend Engineer',
	isOpenToOpportunities: 'open' as const,
	github: 'https://github.com/johndoe',
	email: 'john@example.com',
	linkedin: 'https://linkedin.com/in/johndoe',
};

type ProfileState = { profile: Profile };

const initialState: ProfileState = {
	profile: { ...MOCK_DATA },
};

const profileState = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfile(state, action: PayloadAction<Profile>) {
			state.profile = { ...state.profile, ...action.payload };
		},
	},
});

export const { setProfile } = profileState.actions;

export default profileState.reducer;
