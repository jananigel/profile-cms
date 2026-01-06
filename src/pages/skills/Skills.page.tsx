import { useForm } from 'react-hook-form';

import PageHeader from '../../shared/components/page-header/PageHeader.component';

import SkillEditor from './SkillEdittor.component';

import type { ProficiencyLevel } from '../../core/constants/proficiency-configs.const';
import type { Skill, SkillFormField, SkillFormValue } from '../../core/interfaces/skill.interface';

const formFields: SkillFormField[] = [
	{
		name: 'skillName',
		label: 'Skill Name',
		defaultValue: '',
		fieldType: 'input',
	},
	{
		name: 'category',
		label: 'Category',
		defaultValue: '',
		fieldType: 'select',
	},
	{
		name: 'proficiency',
		label: 'Proficiency',
		defaultValue: 1 as ProficiencyLevel,
		fieldType: 'select',
	},
	{
		name: 'isHighLight',
		label: 'Highlight on Profile',
		defaultValue: false,
		fieldType: 'checkbox',
	},
	{
		name: 'applicationScenario',
		label: 'Application Scenario',
		defaultValue: '',
		fieldType: 'input',
	},
];

const SkillsPage = () => {
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<SkillFormValue>();

	const addSkill = (skill: SkillFormValue) => {
		console.log('skill = ', skill);
	};
	return (
		<div className="space-y-8">
			<PageHeader
				title="Skills & Competencies"
				description="Your technical stack categorized with proficiency details."
			/>
			<SkillEditor
				onSubmit={handleSubmit(addSkill)}
				formFields={formFields}
				register={register}
				errors={errors}
			/>
		</div>
	);
};

export default SkillsPage;
