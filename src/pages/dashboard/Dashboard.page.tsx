import { useSelector } from 'react-redux';

import DashboardStatCard from '../../shared/components/dashboard-stat-card/dashboard-stat-card.component';

import { selectDashboardStats } from './dashboard.selector';

import type { RootState } from '../../stores/store';
const DashboardPage = () => {
	const stats = useSelector((state: RootState) => selectDashboardStats(state));
	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => {
					return <DashboardStatCard key={index} data={stat}></DashboardStatCard>;
				})}
			</div>
		</div>
	);
};

export default DashboardPage;
