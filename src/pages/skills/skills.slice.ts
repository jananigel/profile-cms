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
		addSkill(state, action: PayloadAction<Skill>) {
			state.skills = [action.payload, ...state.skills];
		},
		clearSkills(state) {
			state.skills = [];
		},
	},
});

export const { addSkill, clearSkills } = skillsState.actions;

export default skillsState.reducer;
