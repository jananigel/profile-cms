import { type ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ASIDE_MENUS } from '../../../../../core/constants/aside-menus.const';

import { MainLayoutContext } from './MainLayout.context';

interface MainLayoutProviderProps {
	children: ReactNode;
}

export const MainLayoutProvider = ({ children }: MainLayoutProviderProps) => {
	const [activeNav, setActiveNav] = useState('');
	const location = useLocation();

	useEffect(() => {
		const current = ASIDE_MENUS.find((nav) => location.pathname.startsWith(nav.path));
		setActiveNav(current?.label ?? '');
	}, [location.pathname]);

	return (
		<MainLayoutContext.Provider value={{ activeNav, setActiveNav }}>
			{children}
		</MainLayoutContext.Provider>
	);
};
