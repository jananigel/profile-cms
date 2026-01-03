import { Edit2, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { uuid } from '../../core/utilts';
import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';
import PageHeader from '../../shared/components/page-header/PageHeader.component';

import ProjectEdittor from './ProjectEdittor.component';
import { addProject, deleteProject, updateProject } from './projects.slice';

import type {
	Project,
	ProjectFormField,
	ProjectFormValues,
} from '../../core/interfaces/project.interface';
import type { RootState } from '../../stores/store';

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

const splitComma = (str: string) =>
	str
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean);

const ProjectsPage = () => {
	const projects = useSelector((state: RootState) => state.project.projects);
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
	const memoizeDefaults = useMemo(() => ({ ...baseProjectValues }) as ProjectFormValues, []);
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<ProjectFormValues>({ defaultValues: memoizeDefaults });

	const createNew = () => {
		setEditingProjectId(null);
		reset(memoizeDefaults);
		setIsEditing(true);
	};

	const saveEdit = (values: ProjectFormValues) => {
		const payload: Project = {
			id: editingProjectId ?? uuid(),
			title: values.title,
			link: values.link,
			type: values.type,
			techStack: splitComma(values.techStack),
			description: splitComma(values.description),
		};

		if (editingProjectId) {
			dispatch(updateProject(payload));
		} else {
			dispatch(addProject(payload));
		}

		setIsEditing(false);
		setEditingProjectId(null);
	};

	const startEdit = (project: Project) => {
		const value: ProjectFormValues = {
			...project,
			description: project.description.join(','),
			techStack: project.techStack.join(','),
		};
		setIsEditing(true);
		setEditingProjectId(project.id);
		reset(value);
	};

	const deleteItem = (id: string) => {
		dispatch(deleteProject(id));
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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{projects.map((item) => (
					<CardLayout
						key={item.id}
						className="p-5 flex flex-col group transition-all hover:border-slate-300">
						<div className="flex justify-between">
							<div>
								<span
									className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.type === 'Github' ? 'bg-slate-100 text-slate-600' : 'bg-purple-100 text-purple-600'}`}>
									{item.type}
								</span>
								<h4 className="font-bold text-slate-900 mt-1">{item.title}</h4>
							</div>
							<div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
								<button
									onClick={() => startEdit(item)}
									className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
									<Edit2 size={16} />
								</button>
								<button
									onClick={() => deleteItem(item.id)}
									className="p-1.5 text-slate-400 hover:text-red-600 transition-colors">
									<Trash2 size={16} />
								</button>
							</div>
						</div>
						<p className="text-sm text-slate-500 mt-2 line-clamp-2">{item.description}</p>
						<div className="flex flex-wrap gap-1 mt-3">
							{item.techStack.map((t) => (
								<span
									key={t}
									className="text-[10px] px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-500 rounded">
									{t}
								</span>
							))}
						</div>
					</CardLayout>
				))}
			</div>
		</div>
	);
};

export default ProjectsPage;
