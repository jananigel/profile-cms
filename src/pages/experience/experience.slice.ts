import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { uuid } from '../../core/utilts';

import type { JobExperience } from '../../core/interfaces';

const MOCK_DATA: JobExperience[] = [
	{
		id: uuid(),
		company: 'Tech Corp',
		role: 'Frontend Lead',
		period: '2021 - Present',
		description: ['Leading the migration to React 18', 'Optimized CI/CD pipelines'],
		techStack: ['React', 'TypeScript', 'Tailwind'],
		startYear: 2021,
		startMonth: 5,
		endYear: null,
		endMonth: null,
	},
	{
		id: uuid(),
		company: 'Tech Corp',
		role: 'Frontend Lead',
		period: '2019 - 2021',
		description: ['Leading the migration to React 18', 'Optimized CI/CD pipelines'],
		techStack: ['React', 'TypeScript', 'Tailwind'],
		startYear: 2019,
		startMonth: 5,
		endYear: 2021,
		endMonth: 5,
	},
];

type ExperienceState = { experiences: JobExperience[] };

const initialState: ExperienceState = { experiences: MOCK_DATA };

const experienceState = createSlice({
	name: 'experience',
	initialState,
	reducers: {
		addExperience(state, action: PayloadAction<JobExperience>) {
			state.experiences = [action.payload, ...state.experiences];
		},
		deleteExperience(state, action: PayloadAction<string>) {
			state.experiences = state.experiences.filter((data) => data.id !== action.payload);
		},
	},
});

export const { addExperience, deleteExperience } = experienceState.actions;

export default experienceState.reducer;
