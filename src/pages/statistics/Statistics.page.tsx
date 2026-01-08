import PageHeader from '../../shared/components/page-header/PageHeader.component';

import StatisticsEditor from './StatisticsEditor.component';

const StatisticsPage = () => {
	return (
		<div className="space-y-6">
			<PageHeader
				title="Statistics"
				description="Quantifiable achievements for your landing page."
			/>
			<StatisticsEditor />
		</div>
	);
};

export default StatisticsPage;
