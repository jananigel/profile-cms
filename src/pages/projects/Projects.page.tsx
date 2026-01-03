import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { uuid } from '../../core/utilts';
import PageHeader from '../../shared/components/page-header/PageHeader.component';

import ProjectEdittor from './ProjectEdittor.component';

import type {
	Project,
	ProjectFormField,
	ProjectFormValues,
} from '../../core/interfaces/project.interface';

const formFields: ProjectFormField[] = [
	{
		name: 'title',
		label: 'Title',
		defaultValue: '',
	},
	{
		name: 'type',
		label: 'Project Type',
		defaultValue: 'GitHub',
	},
	{
		name: 'techStack',
		label: 'Tech Stack (comma separated)',
		defaultValue: '',
	},
	{
		name: 'link',
		label: 'Project Link',
		defaultValue: '',
	},
	{
		name: 'description',
		label: 'Description',
		defaultValue: '',
	},
];

const baseProjectValues = formFields.reduce<Partial<ProjectFormValues>>((values, field) => {
	values[field.name] = field.defaultValue;
	return values;
}, {});

const ProjectsPage = () => {
	const [isEditing, setIsEditing] = useState(false);
	const memoizeDefaults = useMemo(() => ({ ...baseProjectValues }) as ProjectFormValues, []);
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<ProjectFormValues>();

	const createNew = () => {
		reset(memoizeDefaults);
		setIsEditing(true);
	};

	const saveEdit = (values: ProjectFormValues) => {
		const splitComma = (str: string) =>
			str
				.split(',')
				.map((item) => item.trim())
				.filter(Boolean);
		const nextProject: Project = {
			id: uuid(),
			...values,
			techStack: splitComma(values.techStack),
			description: splitComma(values.description),
		};
		console.log('save = ', nextProject);
		setIsEditing(false);
	};

	return (
		<div className="space-y-6">
			<PageHeader
				title="Projects"
				description="Portfolio pieces and open source work."
				onAdd={createNew}
			/>
			{isEditing && (
				<ProjectEdittor
					onCancel={() => setIsEditing(false)}
					onSubmit={handleSubmit(saveEdit)}
					register={register}
					formFields={formFields}
					errors={errors}
				/>
			)}
		</div>
	);
};

export default ProjectsPage;
