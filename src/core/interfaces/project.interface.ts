import type { RegisterOptions } from 'react-hook-form';

export interface Project {
	id: string;
	title: string;
	description: string;
	techStack: string[];
	link: string;
	type: string;
}

type FormFieldName = keyof Project;

export interface ProjectFormField<Name extends FormFieldName = FormFieldName> {
	name: Name;
	label: string;
	defaultValue: string;
	setting?: RegisterOptions<Project>;
}
