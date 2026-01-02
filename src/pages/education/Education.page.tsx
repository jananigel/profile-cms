import { Edit2, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';
import PageHeader from '../../shared/components/page-header/PageHeader.component';

import { addEducation, removeEducation } from './education.slice';
import EducationEdittor from './EducationEdittor.component';

import type { Education } from '../../core/interfaces';
import type { EducationFormField } from '../../core/interfaces/education.interface';
import type { RootState } from '../../stores/store';

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
	const educations = useSelector((state: RootState) => state.education.educations);
	const dispatch = useDispatch();
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
		setIsEditing(false);
		dispatch(addEducation(data));
	};

	const startEdit = (item: Education) => {
		setIsEditing(true);
		reset(item);
	};

	const deleteItem = (id: string) => {
		dispatch(removeEducation(id));
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
			<div className="space-y-4">
				{educations.map((item) => (
					<CardLayout
						key={item.id}
						className="p-5 group flex flex-col md:flex-row justify-between items-start md:items-center">
						<div>
							<h4 className="font-bold text-slate-900">{item.school}</h4>
							<p className="text-sm text-slate-500">
								{item.degree} in {item.department}
							</p>
							<p className="text-xs text-slate-400 mt-1">{item.period}</p>
						</div>
						<div className="flex gap-2 mt-4 md:mt-0 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
							<button
								onClick={() => startEdit(item)}
								className="p-2 text-slate-400 hover:text-blue-600 rounded-lg">
								<Edit2 size={18} />
							</button>
							<button
								onClick={() => deleteItem(item.id)}
								className="p-2 text-slate-400 hover:text-red-600 rounded-lg">
								<Trash2 size={18} />
							</button>
						</div>
					</CardLayout>
				))}
			</div>
		</div>
	);
};

export default EducationPage;
