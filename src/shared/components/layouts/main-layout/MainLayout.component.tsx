import { Outlet } from 'react-router-dom';

import AsideMenu from '../../aside-menu/AsideMenu.component';
import MobileAsideMenu from '../../aside-menu/MobileAsideMenu.component';
import MainHeader from '../../main-header/MainHeader.component';

import { MainLayoutProvider } from './context/MainLayout.provider';

const MainLayout = () => {
	return (
		<MainLayoutProvider>
			<div className="flex h-screen bg-slate-50 overflow-hidden relative">
				<MobileAsideMenu></MobileAsideMenu>
				<AsideMenu></AsideMenu>
				<main className="flex-1 flex flex-col overflow-hidden min-w-0">
					<MainHeader></MainHeader>
					<div className="flex-1 overflow-y-auto p-4 md:p-8">
						<div className="max-w-5xl mx-auto pb-20">
							<Outlet></Outlet>
						</div>
					</div>
				</main>
			</div>
		</MainLayoutProvider>
	);
};

export default MainLayout;
