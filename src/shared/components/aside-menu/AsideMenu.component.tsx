import { Pin } from 'lucide-react';
import { useState } from 'react';

import Logout from './Logout.component';
import Navigations from './Navigations.component';

const AsideMenu = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [isPinned, setIsPinned] = useState(false);
	const isExpanded = isPinned || isHovered;

	return (
		<aside
			className="relative z-50 w-[72px] h-screen flex-shrink-0 bg-white border-r border-slate-200 hidden md:block"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{/* Actual Sidebar Menu (Floating overlay when expanded) */}
			<div
				className={`absolute top-0 left-0 h-full bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col shadow-xl overflow-hidden
            ${isExpanded ? 'w-64' : 'w-[72px]'}
          `}>
				{/* Header */}
				<div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 flex-shrink-0">
					<div
						className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
						<h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
							Admin Panel
						</h1>
					</div>
					<button
						onClick={() => setIsPinned(!isPinned)}
						className={`p-1.5 rounded-md transition-colors cursor-pointer ${isPinned ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}
						title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}>
						{isPinned ? <Pin size={18} fill="currentColor" /> : <Pin size={18} />}
					</button>
				</div>

				{/* Navigation */}
				<Navigations isExpanded={isExpanded}></Navigations>

				{/* Footer / Logout */}
				<Logout isExpanded={isExpanded}></Logout>
			</div>
		</aside>
	);
};

export default AsideMenu;
