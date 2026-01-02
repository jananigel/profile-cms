import { useMemo, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import PageHeader from '../../shared/components/page-header/PageHeader.component';

import EducationEdittor from './EducationEdittor.component';

import type { Education } from '../../core/interfaces';
import type { EducationFormField } from '../../core/interfaces/education.interface';

const formFields: EducationFormField[] = [
	{
		name: 'school',
		label: 'School Name',
		defaultValue: '',
	},
	{
		name: 'degree',
		label: 'Degree',
		defaultValue: '',
	},
	{
		name: 'department',
		label: 'Department',
		defaultValue: '',
	},
	{
		name: 'period',
		label: 'Period',
		defaultValue: '',
	},
	{
		name: 'description',
		label: 'Description',
		defaultValue: '',
	},
];

const baseEducationValues = formFields.reduce<Partial<Education>>(
	(values, field) => {
		values[field.name] = field.defaultValue;
		return values;
	},
	{ id: '' },
);

const EducationPage = () => {
	const [isEditing, setIsEditing] = useState(false);
	const memoizedDefaults = useMemo(() => ({ ...baseEducationValues }) as Education, []);
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<Education>({ defaultValues: memoizedDefaults });

	const createNew = () => {
		reset(memoizedDefaults);
		setIsEditing(true);
	};

	const saveEdit: SubmitHandler<Education> = (data, e) => {
		e?.preventDefault();
		console.log('form = ', data);
		setIsEditing(false);
	};
	return (
		<div className="space-y-6">
			<PageHeader title="Education" description="Your academic background." onAdd={createNew} />
			{isEditing && (
				<EducationEdittor
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

export default EducationPage;
