import { DASHBOARD_STATS } from '../../core/constants';

import type { RootState } from '../../stores/store';

export const selectDashboardStats = (state: RootState) => {
	const statsMap = {
		projects: state.project.projects.length,
		skills: state.skills.skills.length,
		experience: state.experience.experiences.length,
		education: state.education.educations.length,
	} as const;
	return DASHBOARD_STATS.map((stat) => {
		return {
			...stat,
			value: statsMap[stat.tab as keyof typeof statsMap],
		};
	});
};
