import { Check, X } from 'lucide-react';

import BaseInput from '../../shared/components/base-input/BaseInput.component';
import BaseTextArea from '../../shared/components/base-textarea/BaseTextarea.component';
import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';

import type {
	JobExperienceFormField,
	JobExperienceFormValues,
} from '../../core/interfaces/job-experience.interface';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface JobExperienceEdittorProps {
	onCancel: () => void;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	register: UseFormRegister<JobExperienceFormValues>;
	formFields: JobExperienceFormField[];
	errors: FieldErrors<JobExperienceFormValues>;
}

const JobExperienceEdittor = ({
	onCancel,
	onSubmit,
	register,
	formFields,
	errors,
}: JobExperienceEdittorProps) => {
	return (
		<CardLayout className="p-6 border-blue-200 bg-blue-50/20 mb-8">
			<div className="flex justify-between items-center mb-4">
				<h4 className="font-bold">Editing Work Experience</h4>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={onCancel}
						className="p-2 text-slate-500 hover:bg-white rounded-lg transition-colors">
						<X size={20} />
					</button>
					<button
						type="submit"
						form="education-editor-form"
						className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
						<Check size={20} />
					</button>
				</div>
			</div>
			<form
				id="education-editor-form"
				className="grid grid-cols-1 md:grid-cols-2 gap-6"
				onSubmit={onSubmit}>
				{formFields.map(({ name, label, setting }) => {
					const fieldRegister = register(name, setting);
					const { ref, onChange, ...fieldProps } = fieldRegister;
					const errorMessage = errors[name]?.message;
					if (name === 'description') {
						return (
							<div className="md:col-span-2" key={name}>
								<BaseTextArea
									key={name}
									label={label}
									error={errorMessage as string | undefined}
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
							error={errorMessage as string | undefined}
							ref={ref}
							onChange={onChange}
							{...fieldProps}
						/>
					);
				})}
			</form>
		</CardLayout>
	);
};

export default JobExperienceEdittor;
