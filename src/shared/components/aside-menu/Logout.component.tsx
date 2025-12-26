import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../core/constants';

interface LogoutProps {
	isExpanded: boolean;
}

const Logout = ({ isExpanded }: LogoutProps) => {
	const navigate = useNavigate();
	const onLogoutClick = () => {
		navigate(ROUTES.login);
	};

	return (
		<div className="p-3 border-t border-slate-100 flex-shrink-0">
			<button
				onClick={onLogoutClick}
				className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all overflow-hidden cursor-pointer`}>
				<div className="flex-shrink-0">
					<LogOut size={20} />
				</div>
				<span
					className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
					Logout
				</span>
			</button>
		</div>
	);
};

export default Logout;
