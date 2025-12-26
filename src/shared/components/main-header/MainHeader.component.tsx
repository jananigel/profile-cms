import { Menu } from 'lucide-react';

import { useMainLayout } from '../layouts/main-layout/context/MainLayout.hook';

const MainHeader = () => {
	const { activeNav, setIsMobileMenuOpen } = useMainLayout();
	return (
		<header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
			<div className="flex items-center gap-3">
				<button
					onClick={() => setIsMobileMenuOpen(true)}
					className="md:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
					<Menu size={20} />
				</button>
				<h2 className="text-lg font-semibold text-slate-800">{activeNav}</h2>
			</div>
			<div className="flex items-center gap-4">
				<div className="text-right hidden sm:block">
					<p className="text-xs text-slate-500">Logged in as</p>
					<p className="text-sm font-medium">Administrator</p>
				</div>
				<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
					AD
				</div>
			</div>
		</header>
	);
};

export default MainHeader;
