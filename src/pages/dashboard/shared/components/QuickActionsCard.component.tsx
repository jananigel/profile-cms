import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../../core/constants';
import CardLayout from '../../../../shared/components/layouts/card-layout/CardLayout.component';

const QuickActionsCard = () => {
	const actions = [
		{
			label: 'Update Bio',
			path: ROUTES.profile,
		},
		{
			label: 'Add Project',
			path: ROUTES.projects,
		},
		{
			label: 'New Job Exp',
			path: ROUTES.experience,
		},
		{
			label: 'Manage Skills',
			path: ROUTES.skills,
		},
	];
	const navigate = useNavigate();
	const redirect = (path: string) => {
		navigate(path);
	};
	return (
		<CardLayout className="p-6">
			<h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
			<div className="grid grid-cols-2 gap-3">
				{actions.map((action, index) => {
					return (
						<button
							key={index}
							onClick={() => redirect(action.path)}
							className="cursor-pointer p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium hover:bg-white hover:border-blue-500 transition-all text-center">
							{action.label}
						</button>
					);
				})}
			</div>
		</CardLayout>
	);
};

export default QuickActionsCard;
