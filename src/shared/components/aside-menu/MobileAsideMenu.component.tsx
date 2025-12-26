import { X } from 'lucide-react';

import { useMainLayout } from '../layouts/main-layout/context/MainLayout.hook';

import Logout from './Logout.component';
import Navigations from './Navigations.component';

const MobileAsideMenu = () => {
	const { isMobileMenuOpen, setIsMobileMenuOpen } = useMainLayout();
	return (
		<>
			{/* Overlay */}
			{isMobileMenuOpen && (
				<div
					role="button"
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							setIsMobileMenuOpen(false);
						}
					}}
					className="fixed inset-0 bg-slate-900/50 z-[60] md:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}

			<aside
				className={`fixed inset-y-0 left-0 w-64 bg-white z-[70] transform transition-transform duration-300 md:hidden flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
				<div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
					<h1 className="text-lg font-bold text-blue-600">Admin Panel</h1>
					<button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 p-1">
						<X size={24} />
					</button>
				</div>
				<Navigations isExpanded={true}></Navigations>
				<Logout isExpanded={true}></Logout>
			</aside>
		</>
	);
};

export default MobileAsideMenu;
