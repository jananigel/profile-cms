import { useForm } from 'react-hook-form';

import PageHeader from '../../shared/components/page-header/PageHeader.component';

import StatisticsEditor from './StatisticsEditor.component';

import type {
	StatisticsFormField,
	StatisticsFormValue,
} from '../../core/interfaces/statistics.interface';

const formFields = [
	{
		name: 'titleKey',
		label: 'Label(Key)',
		defaultValue: '',
		fieldType: 'input',
		placeholder: 'e.g. Years Exp',
	},
	{
		name: 'value',
		label: 'value',
		defaultValue: '',
		fieldType: 'input',
		placeholder: 'e.g. 5+',
	},
	{
		name: 'iconName',
		label: 'ICON Name',
		defaultValue: '',
		fieldType: 'input',
	},
	{
		name: 'color',
		label: 'Color Hex',
		defaultValue: '',
		fieldType: 'input',
		placeholder: 'e.g. #ff0000',
	},
] as const satisfies StatisticsFormField[];

const defaultStatisticsFormValues = formFields.reduce<StatisticsFormValue>((acc, field) => {
	const fieldName = field.name;
	return {
		...acc,
		[fieldName]: field.defaultValue,
	};
}, {} as StatisticsFormValue);

const StatisticsPage = () => {
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<StatisticsFormValue>({ defaultValues: defaultStatisticsFormValues });

	const addStatistics = (data: StatisticsFormValue) => {
		console.log('data = ', data);
	};

	return (
		<div className="space-y-6">
			<PageHeader
				title="Statistics"
				description="Quantifiable achievements for your landing page."
			/>
			<StatisticsEditor
				formFields={formFields}
				register={register}
				onSubmit={handleSubmit(addStatistics)}
				errors={errors}
			/>
		</div>
	);
};

export default StatisticsPage;
