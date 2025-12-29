import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Skill {
	name: string;
}

type SkillState = { skills: Skill[] };

const initialState: SkillState = { skills: [{ name: 'test' }] };

const skillsState = createSlice({
	name: 'skills',
	initialState,
	reducers: {
		setExperience(state, action: PayloadAction<Skill>) {
			state.skills = [action.payload, ...state.skills];
		},
	},
});

export const { setExperience } = skillsState.actions;

export default skillsState.reducer;
