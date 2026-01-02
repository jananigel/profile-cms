import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { type RegisterOptions, useForm } from 'react-hook-form';

import BaseInput from '../../shared/components/base-input/BaseInput.component';
import BaseTextArea from '../../shared/components/base-textarea/BaseTextarea.component';
import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';
import PageHeader from '../../shared/components/page-header/PageHeader.component';

import type { Education } from '../../core/interfaces';

type FormFieldName = keyof Education;

interface FormField<Name extends FormFieldName = FormFieldName> {
	name: Name;
	label: string;
	defaultValue: string;
	setting?: RegisterOptions<Education>;
}

const formFields: FormField[] = [
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

const EducationPage = () => {
	const [isEditing, setIsEditing] = useState(false);
	const {
		formState: { errors },
		register,
		handleSubmit,
		control,
		reset,
	} = useForm<Education>();
	const createNew = () => {
		setIsEditing(true);
	};
	const saveEdit = () => {};
	return (
		<div className="space-y-6">
			<PageHeader title="Education" description="Your academic background." onAdd={createNew} />

			{isEditing && (
				<CardLayout className="p-6 border-blue-200 bg-blue-50/20 mb-8">
					<div className="flex justify-between items-center mb-4">
						<h4 className="font-bold">Education Record</h4>
						<div className="flex gap-2">
							<button
								onClick={() => setIsEditing(false)}
								className="p-2 text-slate-500 hover:bg-white rounded-lg transition-colors">
								<X size={20} />
							</button>
							<button
								onClick={saveEdit}
								className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
								<Check size={20} />
							</button>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{formFields.map(({ name, label, setting }) => {
							const fieldRegister = register(name, setting);
							const { ref, onChange, ...fieldProps } = fieldRegister;
							if (name === 'description') {
								return (
									<div className="md:col-span-2">
										<BaseTextArea
											key={name}
											label={label}
											ref={ref}
											onChange={onChange}
											{...fieldProps}
										/>
									</div>
								);
							}

							return (
								<BaseInput
									key={name}
									type="text"
									label={label}
									ref={ref}
									onChange={onChange}
									{...fieldProps}
								/>
							);
						})}
					</div>
				</CardLayout>
			)}
		</div>
	);
};

export default EducationPage;
