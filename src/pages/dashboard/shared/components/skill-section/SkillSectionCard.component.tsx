import { Award } from 'lucide-react';
import { useSelector } from 'react-redux';

import { PROFICIENCY_CONFIGS } from '../../../../../core/constants';
import CardLayout from '../../../../../shared/components/layouts/card-layout/CardLayout.component';
import { selectSkillsInfo } from '../../../dashboard.selector';

import ProficiencyGroup from './ProficiencyGroup.component';

const SkillSectionCard = () => {
	const data = useSelector(selectSkillsInfo);
	const totalSkills = data.skills.length;
	return (
		<CardLayout className="p-6">
			<h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
				<Award size={18} className="text-amber-500" /> 技能掌握度分析
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
				{PROFICIENCY_CONFIGS.map((config) => {
					const skillsInLevel = data.skills.filter((skill) => skill.proficiency === config.level);
					return (
						<ProficiencyGroup
							key={config.level}
							label={config.label}
							skills={skillsInLevel}
							color={config.color}
							percentage={totalSkills ? Math.round((skillsInLevel.length / totalSkills) * 100) : 0}
						/>
					);
				})}
			</div>
		</CardLayout>
	);
};

export default SkillSectionCard;
