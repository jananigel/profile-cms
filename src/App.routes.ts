import { createHashRouter } from 'react-router-dom';

export const router = createHashRouter([
	{
		path: '/',
		lazy: async () => {
			const { default: LoginPage } = await import('./pages/login/Login.page');
			return { Component: LoginPage };
		},
	},
]);
