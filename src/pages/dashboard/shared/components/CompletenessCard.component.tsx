import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AnimatedArcProgress from '../../../../shared/components/animated-arc-progress/AnimatedArcProgress.component';
import CardLayout from '../../../../shared/components/layouts/card-layout/CardLayout.component';
import { clearSkills } from '../../../skills/skills.slice';

import type { RootState } from '../../../../stores/store';

const CompletenessCard = () => {
	const data = useSelector((state: RootState) => {
		const items = [
			{ label: '個人聯絡 Email', check: !!state.profile.profile.email },
			{ label: 'GitHub 連結', check: !!state.profile.profile.github },
			{ label: 'LinkedIn 連結', check: !!state.profile.profile.linkedin },
			{ label: '職位頭銜設定', check: !!state.profile.profile.title },
			{ label: '至少一筆工作經歷', check: state.experience.experiences.length > 0 },
			{ label: '至少一項專案作品', check: state.project.projects.length > 0 },
			{ label: '技能列表設定', check: state.skills.skills.length > 0 },
			{ label: '教育程度設定', check: state.education.educations.length > 0 },
		];
		const completedCount = items.filter((i) => i.check).length;
		return {
			percentage: Math.round((completedCount / items.length) * 100),
			pending: items.filter((i) => !i.check).map((i) => i.label),
		};
	});

	// update state: dispatch > action
	const dispatch = useDispatch();
	useEffect(() => {
		setTimeout(() => {
			dispatch(clearSkills());
		}, 3000);
	});

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
