import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const MOCK_DATA = {
	firstName: 'John',
	lastName: 'Doe',
	fullName: 'John Doe',
	title: 'Senior Frontend Engineer',
	isOpenToOpportunities: true,
	github: 'https://github.com/johndoe',
	email: 'john@example.com',
	linkedin: 'https://linkedin.com/in/johndoe',
};

interface Profile {
	firstName: string;
	lastName: string;
	fullName: string;
	title: string;
	isOpenToOpportunities: boolean;
	github: string;
	email: string;
	linkedin: string;
}

type ProfileState = { profile: Profile };

const initialState: ProfileState = {
	profile: { ...MOCK_DATA },
};

const profileState = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setExperience(state, action: PayloadAction<Profile>) {
			state.profile = { ...state.profile, ...action.payload };
		},
	},
});

export const { setExperience } = profileState.actions;

export default profileState.reducer;
