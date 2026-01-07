import { MessageSquare, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { PROFICIENCY_CONFIGS, SKILL_CATEGORY } from '../../core/constants';
import { uuid } from '../../core/utilts';
import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';
import PageHeader from '../../shared/components/page-header/PageHeader.component';

import SkillEditor from './SkillEdittor.component';
import { addSkill, removeSkill, updateIsHighLight } from './skills.slice';

import type { ProficiencyLevel } from '../../core/constants/proficiency-configs.const';
import type { Skill, SkillFormField, SkillFormValue } from '../../core/interfaces/skill.interface';
import type { RootState } from '../../stores/store';

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
	const categories = Object.values(SKILL_CATEGORY);
	const skills = useSelector((state: RootState) => state.skills.skills);
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
			name: skill.skillName,
			category: skill.category,
			isHighlight: skill.isHighLight,
			proficiency: skill.proficiency,
			scenario: skill.applicationScenario,
		};
		dispatch(addSkill(payload));
		reset(defaultSkillFormValues);
	};

	const removeItem = (id: string) => {
		dispatch(removeSkill(id));
	};

	const toggleHighlight = (id: string) => {
		dispatch(updateIsHighLight(id));
	};

	const getProficiencyColor = (level: ProficiencyLevel) => {
		switch (level) {
			case 4:
				return 'bg-emerald-100 text-emerald-700 border-emerald-200';
			case 3:
				return 'bg-blue-100 text-blue-700 border-blue-200';
			case 2:
				return 'bg-amber-100 text-amber-700 border-amber-200';
			case 1:
				return 'bg-slate-100 text-slate-700 border-slate-200';
		}
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
			<div className="grid grid-cols-1 gap-8">
				{categories.map((category) => (
					<div key={category} className="space-y-4">
						<div className="flex items-center gap-3 border-b border-slate-200 pb-2">
							<h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
								{category}
							</h4>
							<span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
								{skills.filter((i) => i.category === category).length}
							</span>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
							{skills
								.filter((i) => i.category === category)
								.map((skill) => (
									<CardLayout
										key={skill.id}
										className="p-4 group hover:border-indigo-300 transition-all">
										<div className="flex items-start justify-between">
											<div className="flex items-center gap-2">
												<button
													onClick={() => toggleHighlight(skill.id)}
													className={`p-1 transition-colors ${skill.isHighlight ? 'text-amber-500' : 'text-slate-200 hover:text-amber-200'}`}>
													<Star size={16} fill={skill.isHighlight ? 'currentColor' : 'none'} />
												</button>
												<span className="font-bold text-slate-800">{skill.name}</span>
											</div>
											<button
												onClick={() => removeItem(skill.id)}
												className="p-1.5 text-slate-400 hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-all">
												<Trash2 size={16} />
											</button>
										</div>

										<div className="mt-3 space-y-2">
											<div className="flex items-center gap-2">
												<span
													className={`text-[10px] px-2 py-0.5 rounded border font-bold uppercase ${getProficiencyColor(skill.proficiency)}`}>
													{
														PROFICIENCY_CONFIGS.find((data) => data.level === skill.proficiency)
															?.label
													}
												</span>
											</div>
											{skill.scenario && (
												<div className="flex gap-2 items-start mt-2 p-2 bg-slate-50 rounded-lg">
													<MessageSquare
														size={12}
														className="text-slate-400 mt-0.5 flex-shrink-0"
													/>
													<p className="text-[11px] text-slate-500 italic leading-relaxed">
														{skill.scenario}
													</p>
												</div>
											)}
										</div>
									</CardLayout>
								))}
							{skills.filter((i) => i.category === category).length === 0 && (
								<p className="text-xs text-slate-400 italic pl-1 col-span-full py-4 text-center bg-slate-50 rounded-xl border-2 border-dashed">
									No skills in this category.
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SkillsPage;
