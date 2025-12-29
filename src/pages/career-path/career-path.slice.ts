import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CareerPath {
	name: string;
}

type CareerPathState = { careerPaths: CareerPath[] };

const initialState: CareerPathState = { careerPaths: [{ name: 'test' }] };

const careerPathSlice = createSlice({
	name: 'careerPaths',
	initialState,
	reducers: {
		setCareerPath(state, action: PayloadAction<CareerPath>) {
			state.careerPaths = [action.payload, ...state.careerPaths];
		},
	},
});

export const { setCareerPath } = careerPathSlice.actions;

export default careerPathSlice.reducer;
