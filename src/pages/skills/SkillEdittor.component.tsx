import { PROFICIENCY_CONFIGS, SKILL_CATEGORY } from '../../core/constants';
import BaseCheckbox from '../../shared/components/base-checkbox/BaseCheckbox.compnent';
import BaseInput from '../../shared/components/base-input/BaseInput.component';
import BaseSelect from '../../shared/components/base-select/BaseSelect.component';
import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';
import TextButton from '../../shared/widgets/text-button/TextButton.widget';

const SkillEditor = () => {
	const categories = Object.values(SKILL_CATEGORY);
	return (
		<CardLayout className="p-6 border-indigo-100 bg-indigo-50/10">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<BaseInput label="Skill Name" placeholder="e.g. React" />
				<BaseSelect label="Category" options={categories.map((c) => ({ key: c, label: c }))} />
				<BaseSelect
					label="Proficiency"
					options={PROFICIENCY_CONFIGS.map(({ level, label }) => ({
						key: level.toString(),
						label,
					}))}
				/>
				<div className="flex self-center">
					<BaseCheckbox label="Highlight on Profile" className="items-center" />
				</div>
				<div className="md:col-span-2">
					<BaseInput label="Application Scenario" placeholder="e.g. 用於正式電商專案開發..." />
				</div>
				<div className="flex items-end">
					<TextButton label={'Add Skill'} />
				</div>
			</div>
		</CardLayout>
	);
};

export default SkillEditor;
