import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { uuid } from '../../core/utilts';

interface CareerPath {
	id: string;
	title: string;
}

type CareerPathState = { careerPaths: CareerPath[] };

const initialState: CareerPathState = {
	careerPaths: [
		{ id: uuid(), title: 'Full Stack Developer' },
		{ id: uuid(), title: 'Open Source Contributor' },
	],
};

const careerPathSlice = createSlice({
	name: 'careerPaths',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CareerPath>) {
			state.careerPaths = [action.payload, ...state.careerPaths];
		},
		removeItem(state, action: PayloadAction<string>) {
			state.careerPaths = state.careerPaths.filter(
				(careerPath) => careerPath.id !== action.payload,
			);
		},
	},
});

export const { addItem, removeItem } = careerPathSlice.actions;

export default careerPathSlice.reducer;
