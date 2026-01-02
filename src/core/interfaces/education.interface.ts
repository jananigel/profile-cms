import type { RegisterOptions } from 'react-hook-form';

export interface Education {
	id: string;
	school: string;
	degree: string;
	department: string;
	period: string;
	description: string;
}

type FormFieldName = keyof Education;

export interface EducationFormField<Name extends FormFieldName = FormFieldName> {
	name: Name;
	label: string;
	defaultValue: string;
	setting?: RegisterOptions<Education>;
}
