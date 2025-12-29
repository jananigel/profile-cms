import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Statistics {
	name: string;
}

type StatisticsState = { statistics: Statistics[] };

const initialState: StatisticsState = { statistics: [{ name: 'test' }] };

const statisticsState = createSlice({
	name: 'statistics',
	initialState,
	reducers: {
		setExperience(state, action: PayloadAction<Statistics>) {
			state.statistics = [action.payload, ...state.statistics];
		},
	},
});

export const { setExperience } = statisticsState.actions;

export default statisticsState.reducer;
