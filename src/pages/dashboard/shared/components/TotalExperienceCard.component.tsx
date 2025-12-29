import { Clock } from 'lucide-react';
import { useSelector } from 'react-redux';

import CardLayout from '../../../../shared/components/layouts/card-layout/CardLayout.component';
import { selectExperienceSummary } from '../../../dashboard/dashboard.selector';

const TotalExperienceCard = () => {
	const data = useSelector(selectExperienceSummary);
	return (
		<CardLayout className="p-6 col-span-1">
			<h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
				<Clock size={18} className="text-emerald-500" /> 累計工作年資
			</h3>
			<div className="text-center py-4">
				<div className="inline-flex items-baseline gap-1">
					<span className="text-5xl font-black text-slate-800">{data.years}</span>
					<span className="text-lg font-bold text-slate-500">YEARS</span>
					<span className="text-3xl font-black text-slate-400 ml-2">{data.months}</span>
					<span className="text-sm font-bold text-slate-400">M</span>
				</div>
				<p className="text-sm text-slate-500 mt-6 leading-relaxed">
					根據您在 <b>{data.jobs}</b> 份工作經歷計算。
				</p>
			</div>
		</CardLayout>
	);
};

export default TotalExperienceCard;
