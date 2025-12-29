import { Award, Briefcase, Files, GraduationCap } from 'lucide-react';

import { ROUTES } from './routes.const';

import type { DashboardStatCard } from '../interfaces';

export const DASHBOARD_STATS: DashboardStatCard[] = [
	{
		label: 'Projects',
		value: 1,
		icon: Files,
		iconColor: 'text-blue-600',
		iconBg: 'bg-blue-50',
		tab: 'projects',
		path: ROUTES.projects,
	},
	{
		label: 'Experience',
		value: 2,
		icon: Briefcase,
		iconColor: 'text-emerald-600',
		iconBg: 'bg-emerald-50',
		tab: 'experience',
		path: ROUTES.experience,
	},
	{
		label: 'Education',
		value: 3,
		icon: GraduationCap,
		iconColor: 'text-purple-600',
		iconBg: 'bg-purple-50',
		tab: 'education',
		path: ROUTES.education,
	},
	{
		label: 'Skills',
		value: 4,
		icon: Award,
		iconColor: 'text-amber-600',
		iconBg: 'bg-amber-50',
		tab: 'skills',
		path: ROUTES.skills,
	},
];
