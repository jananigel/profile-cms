import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import PageHeader from '../../shared/components/page-header/PageHeader.component';

import JobExperienceEdittor from './ExperienceEdittor.component';

import type { JobExperience } from '../../core/interfaces';
import type { JobExperienceFormField } from '../../core/interfaces/job-experience.interface';

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

// const baseEducationValues = formFields.reduce<Partial<JobExperience>>(
//   (values, field) => {
//     values[field.name] = field.defaultValue;
//     return values;
//   },
//   { id: '' },
// );

const ExperiencePage = () => {
	const [isEditing, setIsEditing] = useState(false);
	// const memoizedDefaults = useMemo(() => ({ ...baseEducationValues }) as JobExperience, []);
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<JobExperience>();

	const createNew = () => {
		setIsEditing(true);
	};

	const saveEdit = () => {};

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
