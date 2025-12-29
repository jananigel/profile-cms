import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Experience {
	name: string;
}

type ExperienceState = { experiences: Experience[] };

const initialState: ExperienceState = { experiences: [{ name: 'test' }] };

const experienceState = createSlice({
	name: 'experience',
	initialState,
	reducers: {
		setExperience(state, action: PayloadAction<Experience>) {
			state.experiences = [action.payload, ...state.experiences];
		},
	},
});

export const { setExperience } = experienceState.actions;

export default experienceState.reducer;
