import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { uuid } from '../../core/utilts';

import type { Education } from '../../core/interfaces';

type EducationState = { educations: Education[] };

const initialState: EducationState = {
	educations: [
		{
			id: uuid(),
			school: 'National Taiwan University',
			degree: 'Bachelor',
			department: 'Computer Science',
			period: '2016 - 2020',
			description: 'Focused on web technologies and algorithms.',
		},
	],
};

const educationState = createSlice({
	name: 'education',
	initialState,
	reducers: {
		addEducation(state, action: PayloadAction<Education>) {
			state.educations = [action.payload, ...state.educations];
		},
		removeEducation(state, action: PayloadAction<string>) {
			state.educations = state.educations.filter((education) => education.id !== action.payload);
		},
	},
});

export const { addEducation, removeEducation } = educationState.actions;

export default educationState.reducer;
