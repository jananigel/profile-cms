import { Clock } from 'lucide-react';
import { useSelector } from 'react-redux';

import CardLayout from '../../../../shared/components/layouts/card-layout/CardLayout.component';

import type { RootState } from '../../../../stores/store';

const TotalExperienceCard = () => {
	const data = useSelector((state: RootState) => {
		const experiences = state.experience.experiences;
		const now = new Date();
		let totalMonths = 0;
		experiences.forEach((experience) => {
			const start = new Date(experience.startYear, (experience.startMonth || 1) - 1);
			const end = experience.endYear
				? new Date(experience.endYear, (experience.endMonth || 1) - 1)
				: now;
			const months =
				(end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
			totalMonths += Math.max(0, months);
		});

		return {
			years: Math.floor(totalMonths / 12),
			months: totalMonths % 12,
			jobs: experiences.length,
		};
	});
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
