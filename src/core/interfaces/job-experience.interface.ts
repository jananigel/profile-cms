import type { RegisterOptions } from 'react-hook-form';

export interface JobExperience {
	id: string;
	company: string;
	role: string;
	period: string;
	description: string[];
	techStack: string[];
	startYear: number;
	startMonth: number;
	endYear: number | null;
	endMonth: number | null;
}

type FormFieldName = keyof JobExperience;

export interface JobExperienceFormField<Name extends FormFieldName = FormFieldName> {
	name: Name;
	label: string;
	defaultValue: string;
	setting?: RegisterOptions<JobExperience>;
}
