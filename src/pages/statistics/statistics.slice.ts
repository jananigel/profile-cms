import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Statistics } from '../../core/interfaces';

const MOCK_DATA: Statistics[] = [
	{
		id: '1',
		titleKey: 'stat_projects',
		value: '20+',
		iconName: 'Briefcase',
		color: '#3b82f6',
	},
];

type StatisticsState = { statistics: Statistics[] };

const initialState: StatisticsState = { statistics: MOCK_DATA };

const statisticsState = createSlice({
	name: 'statistics',
	initialState,
	reducers: {
		addStatistic(state, action: PayloadAction<Statistics>) {
			state.statistics = [action.payload, ...state.statistics];
		},
		deleteStatistic(state, action: PayloadAction<string>) {
			state.statistics = state.statistics.filter((statistic) => statistic.id !== action.payload);
		},
	},
});

export const { addStatistic, deleteStatistic } = statisticsState.actions;

export default statisticsState.reducer;
