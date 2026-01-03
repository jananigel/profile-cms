import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { uuid } from '../../core/utilts';

import type { Project } from '../../core/interfaces';

const MOCK_DATA: Project[] = [
	{
		id: uuid(),
		title: 'Portfolio CMS',
		description: ['A modern admin panel for managing personal sites.'],
		techStack: ['React', 'Tailwind', 'Lucide'],
		link: 'https://github.com/example/cms',
		type: 'Github',
	},
] as const;

type ProejctState = { projects: Project[] };

const initialState: ProejctState = { projects: MOCK_DATA };

const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		addProject(state, action: PayloadAction<Project>) {
			state.projects = [action.payload, ...state.projects];
		},
		deleteProject(state, action: PayloadAction<string>) {
			state.projects = state.projects.filter((data) => data.id !== action.payload);
		},
		updateProject(state, action: PayloadAction<Project>) {
			state.projects = state.projects.map((project) => {
				if (project.id === action.payload.id) {
					return { ...action.payload };
				}
				return { ...project };
			});
		},
	},
});

export const { addProject, deleteProject, updateProject } = projectSlice.actions;

export default projectSlice.reducer;
