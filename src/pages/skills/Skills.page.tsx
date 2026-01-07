import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { SKILL_CATEGORY } from '../../core/constants';
import { uuid } from '../../core/utilts';
import PageHeader from '../../shared/components/page-header/PageHeader.component';
import { selectSkillsInfo } from '../dashboard/dashboard.selector';

import SkillEditor from './SkillEdittor.component';
import { addSkill } from './skills.slice';

import type { ProficiencyLevel } from '../../core/constants/proficiency-configs.const';
import type { SkillFormField, SkillFormValue } from '../../core/interfaces/skill.interface';

const formFields = [
	{
		name: 'skillName',
		label: 'Skill Name',
		defaultValue: '',
		fieldType: 'input',
		placeholder: 'e.g. React',
	},
	{
		name: 'category',
		label: 'Category',
		defaultValue: SKILL_CATEGORY.frameWork,
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
		placeholder: 'e.g. 用於正式電商專案開發...',
	},
] as const satisfies SkillFormField[];

const defaultSkillFormValues = formFields.reduce<SkillFormValue>((acc, field) => {
	const fieldName = field.name;
	return {
		...acc,
		[fieldName]: field.defaultValue,
	} as SkillFormValue;
}, {} as SkillFormValue);

const SkillsPage = () => {
	const skills = useSelector(selectSkillsInfo);
	const dispatch = useDispatch();
	const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<SkillFormValue>({
		defaultValues: defaultSkillFormValues,
	});

	const addSkillClick = (skill: SkillFormValue) => {
		const payload: Skill = {
			id: editingSkillId ?? uuid(),
			...skill,
		};
		dispatch(addSkill(payload));
	};
	return (
		<div className="space-y-8">
			<PageHeader
				title="Skills & Competencies"
				description="Your technical stack categorized with proficiency details."
			/>
			<SkillEditor
				onSubmit={handleSubmit(addSkillClick)}
				formFields={formFields}
				register={register}
				errors={errors}
			/>
		</div>
	);
};

export default SkillsPage;
