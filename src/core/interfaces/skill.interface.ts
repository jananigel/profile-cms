import type { ProficiencyLevel } from '../constants/proficiency-configs.const';
import type { RegisterOptions } from 'react-hook-form';

export interface Skill {
	id: string;
	name: string;
	category: string;
	isHighlight: boolean;
	proficiency: number;
	scenario: string;
}

export interface SkillFormValue {
	skillName: string;
	category: string;
	proficiency: ProficiencyLevel;
	isHighLight: boolean;
	applicationScenario: string;
}

type FormFieldName = keyof SkillFormValue;

export interface SkillFormField<Name extends FormFieldName = FormFieldName> {
	name: Name;
	label: string;
	defaultValue: SkillFormValue[Name];
	setting?: RegisterOptions<SkillFormValue>;
	fieldType: 'input' | 'select' | 'checkbox';
	placeholder?: string;
}
