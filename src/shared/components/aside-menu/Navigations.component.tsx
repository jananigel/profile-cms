import { NavLink } from 'react-router-dom';

import { ASIDE_MENUS } from '../../../core/constants/aside-menus.const';

interface NavigationComponent {
	isExpanded: boolean;
}

const Navigations = ({ isExpanded }: NavigationComponent) => {
	return (
		<nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
			{ASIDE_MENUS.map((item) => (
				<NavLink
					to={item.path}
					key={item.id}
					className={({ isActive }) =>
						`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                ${
									isActive
										? 'bg-blue-50 text-blue-700'
										: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
								}`
					}>
					{({ isActive }) => (
						<>
							<div
								className={`flex-shrink-0 transition-transform duration-300 ${
									isActive ? 'scale-110' : ''
								}`}>
								<item.icon size={20} />
							</div>

							<span
								className={`whitespace-nowrap transition-all duration-300 ${
									isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
								}`}>
								{item.label}
							</span>
							{isActive && !isExpanded && (
								<div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
							)}
						</>
					)}
				</NavLink>
			))}
		</nav>
	);
};

export default Navigations;
