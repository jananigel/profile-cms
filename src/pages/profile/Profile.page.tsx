import { Save } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Controller, type RegisterOptions, type SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import BaseCheckbox from '../../shared/components/base-checkbox/BaseCheckbox.compnent';
import BaseInput from '../../shared/components/base-input/BaseInput.component';
import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';
import PageHeader from '../../shared/components/page-header/PageHeader.component';

import { setProfile } from './profile.slice';

import type { Profile } from '../../core/interfaces';
import type { AppDispatch, RootState } from '../../stores/store';

type ProfileFieldName = keyof Profile;

interface FormField<Name extends ProfileFieldName = ProfileFieldName> {
	name: Name;
	label: string;
	defaultValue: Profile[Name];
	setting?: RegisterOptions<Profile>;
}

interface FormSection {
	title: string;
	description: string;
	hasActions: boolean;
	fields: FormField[];
}

const formSections: FormSection[] = [
	{
		title: 'Basic Information',
		description: 'Personal details that appear on the profile.',
		hasActions: true,
		fields: [
			{
				name: 'firstName',
				label: 'First Name',
				defaultValue: '',
			},
			{
				name: 'lastName',
				label: 'Last Name',
				defaultValue: '',
			},
			{
				name: 'fullName',
				label: 'Full Name',
				defaultValue: '',
			},
			{
				name: 'title',
				label: 'Title',
				defaultValue: '',
			},
			{
				name: 'isOpenToOpportunities',
				label: 'Currently open to new opportunities',
				defaultValue: 'close',
			},
		],
	},
	{
		title: 'Social Links',
		description: 'Your online presence and contact info.',
		hasActions: false,
		fields: [
			{
				name: 'email',
				label: 'Email',
				defaultValue: '',
			},
			{
				name: 'github',
				label: 'GitHub URL',
				defaultValue: '',
			},
			{
				name: 'linkedin',
				label: 'LinkedIn URL',
				defaultValue: '',
			},
		],
	},
];

const baseFormValues = formSections.reduce((values, section) => {
	section.fields.forEach((field) => {
		(values as Record<keyof Profile, Profile[keyof Profile]>)[field.name] = field.defaultValue;
	});
	return values;
}, {} as Partial<Profile>) as Profile;

const ProfilePage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const profileData = useSelector((state: RootState) => state.profile.profile);
	const defaultValues = useMemo(() => ({ ...baseFormValues, ...profileData }), [profileData]);
	const {
		formState: { errors },
		register,
		handleSubmit,
		control,
		reset,
	} = useForm<Profile>({ defaultValues });

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	const onSubmit: SubmitHandler<Profile> = (data, e) => {
		e?.preventDefault();
		dispatch(setProfile(data));
	};

	return (
		<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
			{formSections.map(({ title, description, hasActions, fields }) => {
				return (
					<section key={title} className="space-y-4">
						{hasActions && (
							<div className="flex justify-between items-center">
								<PageHeader title={title} description={description} />

								<button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all">
									<Save size={16} /> Save Changes
								</button>
							</div>
						)}
						{!hasActions && <PageHeader title={title} description={description} />}
						<CardLayout className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{fields.map(({ name, label, setting }) => {
									if (name === 'isOpenToOpportunities') {
										return (
											<div className="md:col-span-2" key={name}>
												<Controller
													name={name}
													control={control}
													render={({ field }) => (
														<BaseCheckbox
															{...field}
															label={label}
															checked={field.value === 'open'}
															error={errors[name]?.message}
															onChange={(event) => {
																const nextValue = event.target.checked ? 'open' : 'close';
																field.onChange(nextValue);
															}}
														/>
													)}
												/>
											</div>
										);
									}
									const fieldRegister = register(name, setting);
									const { ref, onChange, ...fieldProps } = fieldRegister;
									return (
										<BaseInput
											key={name}
											type="text"
											label={label}
											error={errors[name]?.message}
											{...fieldProps}
											onChange={onChange}
											ref={ref}
										/>
									);
								})}
							</div>
						</CardLayout>
					</section>
				);
			})}
		</form>
	);
};

export default ProfilePage;
