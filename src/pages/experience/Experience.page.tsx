import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { uuid } from '../../core/utilts';
import PageHeader from '../../shared/components/page-header/PageHeader.component';

import JobExperienceEdittor from './ExperienceEdittor.component';

import type { JobExperience } from '../../core/interfaces';
import type {
	JobExperienceFormField,
	JobExperienceFormValues,
} from '../../core/interfaces/job-experience.interface';

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
		</div>
	);
};

export default ExperiencePage;
