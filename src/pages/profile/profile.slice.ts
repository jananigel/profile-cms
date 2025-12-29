import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Profile {
	name: string;
}

type ProfileState = { profile: Profile[] };

const initialState: ProfileState = { profile: [{ name: 'test' }] };

const profileState = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setExperience(state, action: PayloadAction<Profile>) {
			state.profile = [action.payload, ...state.profile];
		},
	},
});

export const { setExperience } = profileState.actions;

export default profileState.reducer;
