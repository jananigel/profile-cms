import {
	BarChart3,
	Briefcase,
	FolderGit2,
	GraduationCap,
	LayoutDashboard,
	Trophy,
	User,
	Wrench,
} from 'lucide-react';

import { ROUTES } from './routes.const';

import type { AsideMenu } from '../interfaces';

export const ASIDE_MENUS: AsideMenu[] = [
	{ id: 'dashboard', label: 'Dashboard', path: ROUTES.dashboard, icon: LayoutDashboard },
	{ id: 'base-info', label: 'Profile', path: ROUTES.dashboard, icon: User },
	{ id: 'career', label: 'Career Paths', path: ROUTES.dashboard, icon: Trophy },
	{ id: 'education', label: 'Education', path: ROUTES.dashboard, icon: GraduationCap },
	{ id: 'experience', label: 'Experience', path: ROUTES.dashboard, icon: Briefcase },
	{ id: 'projects', label: 'Projects', path: ROUTES.dashboard, icon: FolderGit2 },
	{ id: 'skills', label: 'Skills', path: ROUTES.dashboard, icon: Wrench },
	{ id: 'stats', label: 'Statistics', path: ROUTES.dashboard, icon: BarChart3 },
];
