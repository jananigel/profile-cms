import { DASHBOARD_STATS } from '../../core/constants';
import DashboardStatCard from '../../shared/components/dashboard-stat-card/dashboard-stat-card.component';

const DashboardPage = () => {
	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{DASHBOARD_STATS.map((stat, index) => {
					return <DashboardStatCard key={index} data={stat}></DashboardStatCard>;
				})}
			</div>
		</div>
	);
};

export default DashboardPage;
