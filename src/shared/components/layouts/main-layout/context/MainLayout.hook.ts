import { useContext } from 'react';

import { MainLayoutContext } from './MainLayout.context';

export const useMainLayout = () => {
	const context = useContext(MainLayoutContext);
	if (!context) {
		throw new Error('useMainLayout must be used withIn MainLayoutProvider');
	}

	return context;
};
