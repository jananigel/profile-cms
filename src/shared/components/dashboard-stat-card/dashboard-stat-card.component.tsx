import { NavLink } from 'react-router-dom';

import CardLayout from '../layouts/card-layout/CardLayout.component';

import type { DashboardStatCard } from '../../../core/interfaces';

interface StatCardProps {
	data: DashboardStatCard;
}

const DashboardStatCard = ({ data }: StatCardProps) => {
	return (
		<CardLayout
			key={data.label}
			className="p-6 cursor-pointer hover:border-blue-300 transition-all">
			<NavLink to={data.path} className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-slate-500">{data.label}</p>
					<p className="text-2xl font-bold text-slate-900 mt-1">{data.value}</p>
				</div>
				<div className={`p-3 rounded-xl ${data.iconBg} ${data.iconColor}`}>
					<data.icon size={24} />
				</div>
			</NavLink>
		</CardLayout>
	);
};

export default DashboardStatCard;
