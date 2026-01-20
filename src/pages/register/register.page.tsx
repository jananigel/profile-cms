import { ArrowLeft, Lock, type LucideIcon, Mail, User, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { type RegisterOptions, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../core/constants';
import { AuthCard } from '../../shared/components';
import BaseInput from '../../shared/components/base-input/BaseInput.component';
import TextButton from '../../shared/widgets/text-button/TextButton.widget';

interface RegisterForm {
	userName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface FormField {
	name: keyof RegisterForm;
	label: string;
	fieldIcon: LucideIcon;
	setting: RegisterOptions<RegisterForm>;
}

const passwordValidators = {
	hasUppercase: (value: string) =>
		/[A-Z]/.test(value) || 'Must include at least one uppercase letter',
	hasLowercase: (value: string) =>
		/[a-z]/.test(value) || 'Must include at least one lowercase letter',
	hasNumber: (value: string) => /\d/.test(value) || 'Must include at least one number',
	hasSpecialChar: (value: string) =>
		/[^A-Za-z0-9]/.test(value) || 'Must include at least one special character',
};

const formList: FormField[] = [
	{
		name: 'userName',
		label: '使用者名稱',
		fieldIcon: User as LucideIcon,
		setting: {
			value: '',
			required: { value: true, message: 'This field is required' },
		},
	},
	{
		name: 'email',
		label: 'Email',
		fieldIcon: Mail as LucideIcon,
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
		label: '新密碼',
		fieldIcon: Lock as LucideIcon,
		setting: {
			value: '',
			required: { value: true, message: 'This field is required' },
			minLength: { value: 6, message: 'Password must be at least 6 characters' },
			validate: passwordValidators,
		},
	},
	{
		name: 'confirmPassword',
		label: '再次輸入新密碼',
		fieldIcon: Lock as LucideIcon,
		setting: {
			value: '',
			required: { value: true, message: 'This field is required' },
			minLength: { value: 6, message: 'Password must be at least 6 characters' },
			validate: {
				...passwordValidators,
				matchesPassword: (value: string, formValues) =>
					value === formValues.password || '兩次輸入的密碼必須相同',
			},
		},
	},
];

const Register = () => {
	const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | undefined>();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<RegisterForm>();

	const onSubmit: SubmitHandler<RegisterForm> = (data, event) => {
		event?.preventDefault();
		setIsLoading(true);
		setTimeout(() => {
			if (data.email !== 'admin@mail.com') {
				setMessage({ type: 'error', text: '註冊失敗！' });
			} else {
				setMessage({ type: 'success', text: '註冊成功！' });
			}
			setIsLoading(false);
		}, 1500);
	};

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
			<AuthCard
				header={
					<>
						<div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
							<UserPlus className="text-white" size={32} />
						</div>
						<h1 className="text-2xl font-bold text-slate-900">建立新帳號</h1>
						<p className="text-slate-500 mt-2">加入管理系統以開始編輯</p>
					</>
				}>
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					{message && (
						<div
							className={`px-4 py-3 rounded-lg text-sm border ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
							{message.text}
						</div>
					)}
					<div className="space-y-3">
						{formList.map(({ name, setting, label, fieldIcon }) => {
							const Icon = fieldIcon;
							const fieldRegister = register(name, setting);
							const { ref, onChange, ...fieldProps } = fieldRegister;
							const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
								setMessage(undefined);
								onChange(event);
							};
							return (
								<BaseInput
									key={name}
									type="text"
									{...fieldProps}
									placeholder={label}
									ref={ref}
									onChange={handleInputChange}
									error={errors[name]?.message}
									leftIcon={<Icon className="text-slate-400" />}
								/>
							);
						})}
					</div>
					<TextButton
						label={'註冊帳號'}
						isLoading={isLoading}
						isDisabled={isLoading}
						btnType={'submit'}
						btnStyle={'indigo'}></TextButton>
					<button
						className="cursor-pointer w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors mt-4"
						onClick={() => navigate(ROUTES.root)}>
						<ArrowLeft></ArrowLeft>
						<span>返回登入</span>
					</button>
				</form>
			</AuthCard>
		</div>
	);
};

export default Register;
