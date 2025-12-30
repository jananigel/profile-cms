export type ProficiencyLevel = 1 | 2 | 3 | 4;
export const PROFICIENCY_CONFIGS = [
	{ level: 4 as ProficiencyLevel, label: '正式專案使用且非常熟悉', color: '#10b981' },
	{ level: 3 as ProficiencyLevel, label: '有在正式專案使用', color: '#3b82f6' },
	{ level: 2 as ProficiencyLevel, label: '了解但未正式使用', color: '#f59e0b' },
	{ level: 1 as ProficiencyLevel, label: '曾經自行學過', color: '#64748b' },
];
