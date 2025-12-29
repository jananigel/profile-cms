import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Project {
	name: string;
}

type ProejctState = { projects: Project[] };

const initialState: ProejctState = { projects: [{ name: 'test' }] };

const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		setProject(state, action: PayloadAction<Project>) {
			state.projects = [action.payload, ...state.projects];
		},
	},
});

export const { setProject } = projectSlice.actions;

export default projectSlice.reducer;
