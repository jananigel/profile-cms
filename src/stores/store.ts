import { configureStore } from '@reduxjs/toolkit';

import careerPathReducer from '../pages/career-path/career-path.slice';
import educationReducer from '../pages/education/education.slice';
import experienceReducer from '../pages/experience/experience.slice';
import profileReducer from '../pages/profile/profile.slice';
import projectReducer from '../pages/projects/projects.slice';
import skillsReducer from '../pages/skills/skills.slice';
import statisticsReducer from '../pages/statistics/statistics.slice';

export const store = configureStore({
	reducer: {
		project: projectReducer,
		careerPath: careerPathReducer,
		education: educationReducer,
		experience: experienceReducer,
		profile: profileReducer,
		skills: skillsReducer,
		statistics: statisticsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
