import { createHashRouter } from 'react-router-dom';

import { ROUTES } from './core/constants';
import MainLayout from './shared/components/layouts/main-layout/MainLayout.component';

export const router = createHashRouter([
	{
		path: ROUTES.login,
		lazy: async () => {
			const { default: LoginPage } = await import('./pages/login/Login.page');
			return { Component: LoginPage };
		},
	},
	{
		Component: MainLayout,
		children: [
			{
				path: ROUTES.dashboard,
				lazy: async () => {
					const { default: DashboardPage } = await import('./pages/dashboard/Dashboard.page');
					return { Component: DashboardPage };
				},
			},
		],
	},
]);
