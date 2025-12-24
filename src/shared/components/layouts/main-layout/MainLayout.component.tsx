import { Outlet } from 'react-router-dom';

import AsideMenu from '../../aside-menu/AsideMenu.component';

const MainLayout = () => {
	return (
		<div className="flex h-screen bg-slate-50 overflow-hidden">
			<AsideMenu></AsideMenu>
			<Outlet></Outlet>
		</div>
	);
};

export default MainLayout;
