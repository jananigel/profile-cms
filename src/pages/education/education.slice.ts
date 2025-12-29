import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Education {
	name: string;
}

type EducationState = { educations: Education[] };

const initialState: EducationState = { educations: [{ name: 'test' }] };

const educationState = createSlice({
	name: 'education',
	initialState,
	reducers: {
		setEducation(state, action: PayloadAction<Education>) {
			state.educations = [action.payload, ...state.educations];
		},
	},
});

export const { setEducation } = educationState.actions;

export default educationState.reducer;
