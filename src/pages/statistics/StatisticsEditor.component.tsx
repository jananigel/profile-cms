import BaseInput from '../../shared/components/base-input/BaseInput.component';
import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';
import TextButton from '../../shared/widgets/text-button/TextButton.widget';

import type {
	StatisticsFormField,
	StatisticsFormValue,
} from '../../core/interfaces/statistics.interface';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface EditorProps {
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	register: UseFormRegister<StatisticsFormValue>;
	formFields: StatisticsFormField[];
	errors: FieldErrors<StatisticsFormValue>;
}

const StatisticsEditor = ({ onSubmit, register, formFields, errors }: EditorProps) => {
	return (
		<CardLayout className="p-6">
			<form
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
				onSubmit={onSubmit}>
				{formFields.map(({ name, setting, label, placeholder }) => {
					const fieldRegister = register(name, setting);
					const { ref, onChange, ...fieldProps } = fieldRegister;
					const errorMsg = errors[name]?.message;
					return (
						<BaseInput
							key={name}
							label={label}
							ref={ref}
							onChange={onChange}
							{...fieldProps}
							placeholder={placeholder}
							error={errorMsg as string | undefined}
						/>
					);
				})}
				<TextButton label={'Add Stat'} btnType={'submit'} />
			</form>
		</CardLayout>
	);
};

export default StatisticsEditor;
