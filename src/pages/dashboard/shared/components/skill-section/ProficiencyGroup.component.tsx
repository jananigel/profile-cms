import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import AnimatedCircularProgress from '../../../../../shared/components/animated-circular-progress/AnimatedCircularProgress.component';

interface ProficiencyGroupProps {
	percentage: number;
	color: string;
	label: string;
	skills: any;
}

const ProficiencyGroup = ({ percentage, color, label, skills }: ProficiencyGroupProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const displaySkills = isExpanded ? skills : skills.slice(0, 3);
	const hasMore = skills.length > 3;

	return (
		<div className="bg-slate-50 rounded-xl p-4 border border-slate-100 transition-all hover:border-slate-200">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-3">
					<AnimatedCircularProgress percentage={percentage} color={color} size="sm" />
					<div>
						<h4 className="font-bold text-slate-800 text-sm leading-tight">{label}</h4>
						<p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
							{skills.length} 項技能
						</p>
					</div>
				</div>
				{hasMore && (
					<button
						onClick={() => setIsExpanded(!isExpanded)}
						className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
						{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
					</button>
				)}
			</div>

			<div className="flex flex-wrap gap-2">
				{displaySkills.map((skill) => (
					<span
						key={skill.id}
						className="px-2 py-1 bg-white border border-slate-200 rounded text-[11px] font-medium text-slate-600 shadow-sm">
						{skill.name}
					</span>
				))}
				{skills.length === 0 && <span className="text-xs text-slate-400 italic">尚未加入技能</span>}
				{!isExpanded && hasMore && (
					<span className="text-[11px] text-blue-500 font-bold px-1 py-1">
						+{skills.length - 3}
					</span>
				)}
			</div>
		</div>
	);
};

export default ProficiencyGroup;
