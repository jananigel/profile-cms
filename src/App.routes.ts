import { createHashRouter } from 'react-router-dom';

import MainLayout from './shared/components/layouts/main-layout/MainLayout.component';

export const router = createHashRouter([
	{
		path: '/',
		lazy: async () => {
			const { default: LoginPage } = await import('./pages/login/Login.page');
			return { Component: LoginPage };
		},
	},
	{
		Component: MainLayout,
		children: [
			{
				path: 'dashboard',
				lazy: async () => {
					const { default: DashboardPage } = await import('./pages/dashboard/Dashboard.page');
					return { Component: DashboardPage };
				},
			},
		],
	},
]);
