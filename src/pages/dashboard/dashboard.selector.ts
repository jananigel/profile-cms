import { createSelector } from '@reduxjs/toolkit';

import { DASHBOARD_STATS } from '../../core/constants';

import type { RootState } from '../../stores/store';

const selectProjects = (state: RootState) => state.project.projects;
const selectSkills = (state: RootState) => state.skills.skills;
const selectExperiences = (state: RootState) => state.experience.experiences;
const selectEducations = (state: RootState) => state.education.educations;
const selectProfile = (state: RootState) => state.profile.profile;

export const selectDashboardStats = createSelector(
	[selectProjects, selectSkills, selectExperiences, selectEducations],
	(projects, skills, experiences, educations) => {
		const statsMap = {
			projects: projects.length,
			skills: skills.length,
			experience: experiences.length,
			education: educations.length,
		} as const;
		return DASHBOARD_STATS.map((stat) => {
			return {
				...stat,
				value: statsMap[stat.tab as keyof typeof statsMap],
			};
		});
	}
);

export const selectProfileSnapshot = createSelector(
	[selectProfile, selectSkills],
	(profile, skills) => ({
		profile,
		skills,
	})
);

export const selectExperienceSummary = createSelector(
	[selectExperiences],
	(experiences) => {
		const now = new Date();
		let totalMonths = 0;
		experiences.forEach((experience) => {
			const start = new Date(experience.startYear, (experience.startMonth || 1) - 1);
			const end = experience.endYear
				? new Date(experience.endYear, (experience.endMonth || 1) - 1)
				: now;
			const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
			totalMonths += Math.max(0, months);
		});

		return {
			years: Math.floor(totalMonths / 12),
			months: totalMonths % 12,
			jobs: experiences.length,
		};
	}
);

export const selectCompleteness = createSelector(
	[selectProfile, selectExperiences, selectProjects, selectSkills, selectEducations],
	(profile, experiences, projects, skills, educations) => {
		const items = [
			{ label: '個人聯絡 Email', check: !!profile.email },
			{ label: 'GitHub 連結', check: !!profile.github },
			{ label: 'LinkedIn 連結', check: !!profile.linkedin },
			{ label: '職位頭銜設定', check: !!profile.title },
			{ label: '至少一筆工作經歷', check: experiences.length > 0 },
			{ label: '至少一項專案作品', check: projects.length > 0 },
			{ label: '技能列表設定', check: skills.length > 0 },
			{ label: '教育程度設定', check: educations.length > 0 },
		];
		const completedCount = items.filter((i) => i.check).length;
		return {
			percentage: Math.round((completedCount / items.length) * 100),
			pending: items.filter((i) => !i.check).map((i) => i.label),
		};
	}
);
