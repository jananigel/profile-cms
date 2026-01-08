import type { RegisterOptions } from 'react-hook-form';

interface BaseStastics {
	titleKey: string;
	value: string;
	iconName: string;
	color: string;
}

export interface Statistic extends BaseStastics {
	id: string;
}

export type StatisticsFormValue = BaseStastics;

type FormFieldName = keyof StatisticsFormValue;

export interface StatisticsFormField<Name extends FormFieldName = FormFieldName> {
	name: Name;
	label: string;
	defaultValue: StatisticsFormValue[Name];
	setting?: RegisterOptions<StatisticsFormValue>;
	placeholder?: string;
	fieldType: 'input' | 'select' | 'checkbox';
}
