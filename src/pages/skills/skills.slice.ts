import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { SKILL_CATEGORY } from '../../core/constants';

import type { Skill } from '../../core/interfaces';

type SkillState = { skills: Skill[] };

const initialState: SkillState = {
	skills: [
		{
			id: '1',
			name: 'React',
			category: SKILL_CATEGORY.frameWork,
			isHighlight: true,
			proficiency: 4,
			scenario: '用於多個大型電商專案',
		},
		{
			id: '2',
			name: 'TypeScript',
			category: SKILL_CATEGORY.languages,
			isHighlight: true,
			proficiency: 3,
			scenario: '正式專案開發必備工具',
		},
	],
};

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
