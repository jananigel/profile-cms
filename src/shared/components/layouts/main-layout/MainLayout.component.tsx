import { Outlet } from 'react-router-dom';

import AsideMenu from '../../aside-menu/AsideMenu.component';
import MainHeader from '../../main-header/MainHeader.component';

import { MainLayoutProvider } from './context/MainLayout.provider';

const MainLayout = () => {
	return (
		<MainLayoutProvider>
			<div className="flex h-screen bg-slate-50 overflow-hidden">
				<AsideMenu></AsideMenu>
				<main className="flex-1 flex flex-col overflow-hidden min-w-0">
					<MainHeader></MainHeader>
					<Outlet></Outlet>
				</main>
			</div>
		</MainLayoutProvider>
	);
};

export default MainLayout;
