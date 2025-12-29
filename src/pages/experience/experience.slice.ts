import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const MOCK_DATA = [
	{
		id: '1',
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
		id: '1',
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

interface Experience {
	id: string;
	company: string;
	role: string;
	period: string;
	description: string[];
	techStack: string[];
	startYear: number;
	startMonth: number;
	endYear: number | null;
	endMonth: number | null;
}

type ExperienceState = { experiences: Experience[] };

const initialState: ExperienceState = { experiences: MOCK_DATA };

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
