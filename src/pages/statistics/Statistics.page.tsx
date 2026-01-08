import { Activity, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { uuid } from '../../core/utilts';
import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';
import PageHeader from '../../shared/components/page-header/PageHeader.component';

import { addStatistic, deleteStatistic } from './statistics.slice';
import StatisticsEditor from './StatisticsEditor.component';

import type { Statistics } from '../../core/interfaces';
import type {
	StatisticsFormField,
	StatisticsFormValue,
} from '../../core/interfaces/statistics.interface';
import type { RootState } from '../../stores/store';

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
		label: 'Value',
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
	const statistics = useSelector((state: RootState) => state.statistics.statistics);
	const dispatch = useDispatch();
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<StatisticsFormValue>({ defaultValues: defaultStatisticsFormValues });

	const addItem = (data: StatisticsFormValue) => {
		const stat: Statistics = {
			id: uuid(),
			...data,
		};
		dispatch(addStatistic(stat));
		reset(defaultStatisticsFormValues);
	};

	const removeItem = (id: string) => {
		dispatch(deleteStatistic(id));
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
				onSubmit={handleSubmit(addItem)}
				errors={errors}
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{statistics.map((stat) => {
					const IconComp = stat.iconName || Activity;
					return (
						<CardLayout
							key={stat.id}
							className="p-6 flex items-center justify-between border-l-4"
							style={{ borderLeftColor: stat.color }}>
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-xl bg-slate-50 text-slate-600">
									<IconComp size={24} color={stat.color} />
								</div>
								<div>
									<p className="text-2xl font-bold text-slate-900">{stat.value}</p>
									<p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
										{stat.titleKey}
									</p>
								</div>
							</div>
							<button
								onClick={() => removeItem(stat.id)}
								className="p-2 text-slate-300 hover:text-red-500 transition-colors">
								<Trash2 size={18} />
							</button>
						</CardLayout>
					);
				})}
			</div>
		</div>
	);
};

export default StatisticsPage;
