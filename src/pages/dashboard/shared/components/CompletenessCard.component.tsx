import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AnimatedArcProgress from '../../../../shared/components/animated-arc-progress/AnimatedArcProgress.component';
import CardLayout from '../../../../shared/components/layouts/card-layout/CardLayout.component';
import { selectCompleteness } from '../../../dashboard/dashboard.selector';
import { clearSkills } from '../../../skills/skills.slice';

const CompletenessCard = () => {
	const data = useSelector(selectCompleteness);

	// update state: dispatch > action
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		dispatch(clearSkills());
	// 	}, 3000);
	// });

	return (
		<CardLayout className="p-6 lg:col-span-2">
			<h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
				<CheckCircle2 size={18} className="text-blue-500" /> 資料完整度分析
			</h3>
			<div className="flex flex-col md:flex-row items-center gap-8">
				<AnimatedArcProgress percentage={data.percentage} color="#3b82f6" />
				<div className="flex-1 space-y-3">
					<h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">待優化項目</h4>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
						{data.pending.length > 0 ? (
							data.pending.map((item) => (
								<div key={item} className="flex items-center gap-2 text-sm text-slate-500">
									<AlertCircle size={14} className="text-amber-500" />
									{item}
								</div>
							))
						) : (
							<div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
								<CheckCircle2 size={16} />
								恭喜！所有基礎資料已填寫完畢
							</div>
						)}
					</div>
				</div>
			</div>
		</CardLayout>
	);
};

export default CompletenessCard;
