import { PROFICIENCY_CONFIGS, SKILL_CATEGORY } from '../../core/constants';
import BaseCheckbox from '../../shared/components/base-checkbox/BaseCheckbox.compnent';
import BaseInput from '../../shared/components/base-input/BaseInput.component';
import BaseSelect from '../../shared/components/base-select/BaseSelect.component';
import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';
import TextButton from '../../shared/widgets/text-button/TextButton.widget';

import type { SkillFormField, SkillFormValue } from '../../core/interfaces/skill.interface';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface SkillEditorProps {
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	register: UseFormRegister<SkillFormValue>;
	formFields: SkillFormField[];
	errors: FieldErrors<SkillFormValue>;
}

const SkillEditor = ({ onSubmit, register, formFields, errors }: SkillEditorProps) => {
	const categories = Object.values(SKILL_CATEGORY);
	return (
		<CardLayout className="p-6 border-indigo-100 bg-indigo-50/10">
			<form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{formFields.map(({ name, setting, label, placeholder }) => {
					const fieldRegister = register(name, setting);
					const { ref, onChange, ...fieldProps } = fieldRegister;
					const errorMessage = errors[name]?.message;
					if (name === 'skillName') {
						return (
							<BaseInput
								key={name}
								ref={ref}
								onChange={onChange}
								{...fieldProps}
								error={errorMessage as string | undefined}
								label={label}
								placeholder={placeholder}
							/>
						);
					}

					if (name === 'category') {
						return (
							<BaseSelect
								key={name}
								label={label}
								ref={ref}
								onChange={onChange}
								{...fieldProps}
								options={categories.map((c) => ({ key: c, label: c }))}
							/>
						);
					}

					if (name === 'proficiency') {
						return (
							<BaseSelect
								key={name}
								label={label}
								options={PROFICIENCY_CONFIGS.map(({ level, label }) => ({
									key: level.toString(),
									label,
								}))}
								error={errorMessage as string | undefined}
								onChange={onChange}
								ref={ref}
								{...fieldProps}
							/>
						);
					}

					if (name === 'isHighLight') {
						return (
							<div key={name} className="flex self-center">
								<BaseCheckbox
									label={label}
									error={errorMessage as string | undefined}
									ref={ref}
									{...fieldProps}
									onChange={onChange}
									className="items-center"
								/>
							</div>
						);
					}

					return (
						<div key={name} className="md:col-span-2">
							<BaseInput
								label={label}
								error={errorMessage as string | undefined}
								ref={ref}
								{...fieldProps}
								onChange={onChange}
								placeholder={placeholder}
							/>
						</div>
					);
				})}

				<div className="flex items-end">
					<TextButton label={'Add Skill'} btnType="submit" />
				</div>
			</form>
		</CardLayout>
	);
};

export default SkillEditor;
