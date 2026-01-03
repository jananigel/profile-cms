import { Edit2, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { uuid } from '../../core/utilts';
import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';
import PageHeader from '../../shared/components/page-header/PageHeader.component';

import { deleteExperience } from './experience.slice';
import JobExperienceEdittor from './ExperienceEdittor.component';

import type { JobExperience } from '../../core/interfaces';
import type {
	JobExperienceFormField,
	JobExperienceFormValues,
} from '../../core/interfaces/job-experience.interface';
import type { RootState } from '../../stores/store';

const formFields: JobExperienceFormField[] = [
	{
		name: 'company',
		label: 'Company Name',
		defaultValue: '',
	},
	{
		name: 'role',
		label: 'Role Title',
		defaultValue: '',
	},
	{
		name: 'period',
		label: 'Period (e.g. 2021 - Present)',
		defaultValue: '',
	},
	{
		name: 'techStack',
		label: 'Tech Stack (comma separated)',
		defaultValue: '',
	},
	{
		name: 'description',
		label: 'Description Bullet Points (comma separated)',
		defaultValue: '',
	},
];

const baseJobExperienceValues = formFields.reduce<Partial<JobExperienceFormValues>>(
	(values, field) => {
		values[field.name] = field.defaultValue;
		return values;
	},
	{},
);

const ExperiencePage = () => {
	const [isEditing, setIsEditing] = useState(false);
	const jobExperiences = useSelector((state: RootState) => state.experience.experiences);
	const dispatch = useDispatch();
	const memoizedDefaults = useMemo(
		() => ({ ...baseJobExperienceValues }) as JobExperienceFormValues,
		[],
	);
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<JobExperienceFormValues>({ defaultValues: memoizedDefaults });

	const createNew = () => {
		reset(memoizedDefaults);
		setIsEditing(true);
	};

	const saveEdit = (values: JobExperienceFormValues) => {
		const splitComma = (str: string) =>
			str
				.split(',')
				.map((item) => item.trim())
				.filter(Boolean);
		const nextExperience: JobExperience = {
			id: uuid(),
			company: values.company,
			role: values.role,
			period: values.period,
			techStack: splitComma(values.techStack),
			description: splitComma(values.description),
			startYear: new Date().getFullYear(),
			startMonth: 1,
			endYear: null,
			endMonth: null,
		};
		console.log('Saving job experience', nextExperience);
		setIsEditing(false);
	};

	const startEdit = (experience: JobExperience) => {
		const value: JobExperienceFormValues = {
			company: experience.company,
			role: experience.role,
			period: experience.period,
			techStack: experience.techStack.join(','),
			description: experience.description.join(','),
		};
		setIsEditing(true);
		reset(value);
	};

	const deleteItem = (id: string) => {
		dispatch(deleteExperience(id));
	};

	return (
		<div className="space-y-6">
			<PageHeader
				title="Job Experience"
				description="Professional background and work history."
				onAdd={createNew}
			/>
			{isEditing && (
				<JobExperienceEdittor
					onCancel={() => setIsEditing(false)}
					onSubmit={handleSubmit(saveEdit)}
					register={register}
					formFields={formFields}
					errors={errors}
				/>
			)}
			<div className="space-y-4">
				{jobExperiences.map((item) => (
					<CardLayout
						key={item.id}
						className="p-5 flex flex-col md:flex-row md:items-center justify-between group transition-all hover:border-slate-300">
						<div>
							<h4 className="font-bold text-slate-900">{item.role}</h4>
							<p className="text-sm font-medium text-blue-600">{item.company}</p>
							<p className="text-xs text-slate-400 mt-1">{item.period}</p>
						</div>
						<div className="flex gap-2 mt-4 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
							<button
								onClick={() => startEdit(item)}
								className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
								<Edit2 size={18} />
							</button>
							<button
								onClick={() => deleteItem(item.id)}
								className="p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
								<Trash2 size={18} />
							</button>
						</div>
					</CardLayout>
				))}
			</div>
		</div>
	);
};

export default ExperiencePage;
