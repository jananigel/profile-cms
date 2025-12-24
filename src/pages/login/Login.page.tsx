import { Lock, type LucideIcon, ShieldCheck, User } from 'lucide-react';
import React, { useState } from 'react';
import { type RegisterOptions, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../core/constants';
import TextButton from '../../shared/widgets/text-button/TextButton.widget';

interface LoginForm {
	email: string;
	password: string;
}

interface FormField {
	name: keyof LoginForm;
	label: string;
	fieldIcon: LucideIcon;
	setting: RegisterOptions<LoginForm>;
}

const formList: FormField[] = [
	{
		name: 'email',
		label: 'Email',
		fieldIcon: User as LucideIcon,
		setting: {
			value: 'admin@mail.com',
			required: { value: true, message: 'This field is required' },
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: 'Please enter a valid email address',
			},
		},
	},
	{
		name: 'password',
		label: 'Password',
		fieldIcon: Lock as LucideIcon,
		setting: {
			value: 'Password!23',
			required: { value: true, message: 'This field is required' },
			minLength: { value: 6, message: 'Password must be at least 6 characters' },
			validate: {
				hasUppercase: (value) =>
					/[A-Z]/.test(value) || 'Must include at least one uppercase letter',
				hasLowercase: (value) =>
					/[a-z]/.test(value) || 'Must include at least one lowercase letter',
				hasNumber: (value) => /\d/.test(value) || 'Must include at least one number',
				hasSpecialChar: (value) =>
					/[^A-Za-z0-9]/.test(value) || 'Must include at least one special character',
			},
		},
	},
];

const LoginPage = () => {
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<LoginForm>();

	const onSubmit: SubmitHandler<LoginForm> = (data, e) => {
		e?.preventDefault();
		if (data.email === 'admin@mail.com' && data.password === 'Password!23') {
			setError('');
			// handle login
			navigate(ROUTES.dashboard);
		} else {
			setError('Invalid credentials. Use admin/password');
		}
	};

	return (
		<>
			<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
				<div className="w-full max-w-md">
					<div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
						<div className="p-8 text-center bg-slate-50 border-b border-slate-100">
							<div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
								<ShieldCheck className="text-white" size={32} />
							</div>
							<h1 className="text-2xl font-bold text-slate-900">Portfolio CMS</h1>
							<p className="text-slate-500 mt-2">Sign in to manage your website</p>
						</div>
						<form className="p-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
							{formList.map(({ name, setting, label, fieldIcon }) => {
								const Icon = fieldIcon;
								const fieldRegister = register(name, setting);
								const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
									setError('');
									fieldRegister.onChange(event);
								};
								return (
									<div className="relative" key={name}>
										<Icon
											className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
											size={18}
										/>
										<input
											type={name === 'email' ? 'text' : 'password'}
											placeholder={label}
											autoComplete="off"
											className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
											{...fieldRegister}
											onChange={handleInputChange}
										/>
										{errors[name] && (
											<p className="absolute text-[#f00] text-sm">{errors[name]?.message}</p>
										)}
									</div>
								);
							})}
							{error && (
								<div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100">
									{error}
								</div>
							)}
							<TextButton label={'Log In'} btnType={'submit'}></TextButton>
						</form>
						<div className="p-4 text-center bg-slate-50 border-t border-slate-100">
							<p className="text-xs text-slate-400">Demo mode: admin@mail.com / Password!23</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
