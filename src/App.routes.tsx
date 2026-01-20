import { createHashRouter, redirect } from 'react-router-dom';

import { ROUTES } from './core/constants';
import NotFound from './pages/errors/NotFound.page';
import MainLayout from './shared/components/layouts/main-layout/MainLayout.component';
import RouteHydrateFallback from './shared/components/route-hydrate-fallback/RouteHydrateFallback.component';

export const router = createHashRouter([
	{
		path: '/',
		errorElement: <NotFound />,
		children: [
			{
				path: ROUTES.login,
				loader: () => redirect(ROUTES.root),
			},
			{
				path: ROUTES.root,
				HydrateFallback: RouteHydrateFallback,
				lazy: async () => {
					const { default: LoginPage } = await import('./pages/login/Login.page');
					return { Component: LoginPage };
				},
			},
			{
				path: ROUTES.forgotPassword,
				HydrateFallback: RouteHydrateFallback,
				lazy: async () => {
					const { default: ForgotPasswordPage } = await import(
						'./pages/forgot-password/ForgotPassword.page'
					);
					return { Component: ForgotPasswordPage };
				},
			},
			{
				path: ROUTES.resetPassword,
				HydrateFallback: RouteHydrateFallback,
				lazy: async () => {
					const { default: ResetPasswordPage } = await import(
						'./pages/reset-password/ResetPassword.page'
					);
					return { Component: ResetPasswordPage };
				},
			},
			{
				Component: MainLayout,
				HydrateFallback: RouteHydrateFallback,
				children: [
					{
						path: ROUTES.dashboard,
						lazy: async () => {
							const { default: DashboardPage } = await import('./pages/dashboard/Dashboard.page');
							return { Component: DashboardPage };
						},
					},
					{
						path: ROUTES.profile,
						lazy: async () => {
							const { default: ProfilePage } = await import('./pages/profile/Profile.page');
							return { Component: ProfilePage };
						},
					},
					{
						path: ROUTES.careerPaths,
						lazy: async () => {
							const { default: CareerPage } = await import('./pages/career-path/CareerPath.page');
							return { Component: CareerPage };
						},
					},
					{
						path: ROUTES.education,
						lazy: async () => {
							const { default: EducationPage } = await import('./pages/education/Education.page');
							return { Component: EducationPage };
						},
					},
					{
						path: ROUTES.experience,
						lazy: async () => {
							const { default: ExperiencePage } = await import(
								'./pages/experience/Experience.page'
							);
							return { Component: ExperiencePage };
						},
					},
					{
						path: ROUTES.projects,
						lazy: async () => {
							const { default: ProjectsPage } = await import('./pages/projects/Projects.page');
							return { Component: ProjectsPage };
						},
					},
					{
						path: ROUTES.skills,
						lazy: async () => {
							const { default: SkillsPage } = await import('./pages/skills/Skills.page');
							return { Component: SkillsPage };
						},
					},
					{
						path: ROUTES.statistics,
						lazy: async () => {
							const { default: Statistics } = await import('./pages/statistics/Statistics.page');
							return { Component: Statistics };
						},
					},
				],
			},
		],
	},
]);
